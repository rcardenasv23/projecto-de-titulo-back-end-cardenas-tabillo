import entity from '../../entities/mailer/app'
import MAIL from '../../functions/mailer'
const uuid = require('uuid')

const querySale = (conn: any, models: any) => {
  return Object.freeze({
    createSale,
    uploadFile,
    deleteFile,
    getSalesByUser,
    getSalesBySeller,
    getSaleDetailUser,
    getSaleDetailSeller,
    acceptSale,
    rejectSale,
  })

  async function createSale(values: any) {
    const transaction = await models.sequelize.transaction()
    try {
      const Sale = models.sale
      const Publication = models.publication
      const Stock = models.stock
      const ContentStates = models.content_state
      const states = await ContentStates.findAll({
        raw: true,
        where: { content_state: ['disponible', 'espera'] },
      })
      const sales = []
      const publications: any = []
      for (let sellerUUID of Object.keys(values.sellers)) {
        let sellerPublications = await Publication.findAll({
          where: {
            id_fixed: Object.keys(values.sellers[sellerUUID]),
          },
          raw: true,
        })
        publications.push(...sellerPublications)
        let total = sellerPublications.reduce(
          (sum: number, publication: any) => {
            sum +=
              publication.price *
              values.sellers[sellerUUID][publication.id_fixed]
            return sum
          },
          0
        )
        const sale = await Sale.create(
          {
            id_sale: uuid.v4(),
            id_user: values.user.id_user,
            id_seller: sellerUUID,
            fixeds: values.sellers[sellerUUID],
            sale_state: states.filter((s: any) =>
              s.content_state === 'espera' ? s.id_state : null
            )[0].id_state,
            total: total,
            created_at: new Date(),
            updated_at: new Date(),
          },
          { raw: true }
        )
        for (let id_fixed of Object.keys(values.sellers[sellerUUID])) {
          const publication = publications.filter((pub: any) =>
            pub.id_fixed === id_fixed ? pub : null
          )[0]
          const avaibleStocks = await Stock.findAll({
            where: {
              id_fixed: id_fixed,
              stock_state: states.filter((s: any) =>
                s.content_state === 'disponible' ? s : null
              )[0].id_state,
            },
            raw: true,
          })
          if (
            avaibleStocks.length <
              Number(values.sellers[sellerUUID][id_fixed]) ||
            publication.current_stock -
              Number(values.sellers[sellerUUID][id_fixed]) <
              0
          ) {
            throw 'No hay suficiente stock para realizar la venta.'
          }
          for (
            let i = 0;
            i < avaibleStocks.length &&
            i < Number(values.sellers[sellerUUID][id_fixed]);
            i++
          ) {
            await Stock.update(
              {
                ...avaibleStocks[i],
                id_sale: sale.id_sale,
                stock_state: states.filter((s: any) =>
                  s.content_state === 'espera' ? s : null
                )[0].id_state,
              },
              {
                where: { id_stock: avaibleStocks[i].id_stock },
                raw: true,
              }
            )
          }
          await Publication.update(
            {
              ...publication,
              current_stock:
                publication.current_stock -
                Number(values.sellers[sellerUUID][id_fixed]),
            },
            { where: { id_fixed: id_fixed } }
          )
        }
        sales.push(sale)
      }
      const Sellers = models.seller
      let mail = entity.optionsTemplate
      let body = ''
      mail.to = values.user.email
      mail.subject = 'Compra Subaster'
      for (let sale of sales) {
        const seller = await Sellers.findOne({
          where: { id_seller: sale.id_seller },
          raw: true,
        })
        body +=
          '<h1>Para las compras en la tienda ' + seller.store_name + '</h1>\n'
        body += '<h3> El código de la venta es: ' + sale.id_sale + '</h3>'
        body += '<h2>Debes depositar en la siguiente cuenta:</h2>\n'
        body += '<h3> Banco: ' + seller.bank_name + '</h3>\n'
        body += '<h3> Destinatario: ' + seller.bank_account_name + '</h3>\n'
        body += '<h3> Tipo de cuenta: ' + seller.bank_account_type + '</h3>\n'
        body += '<h3> Nro de cuenta: ' + seller.bank_account_address + '</h3>\n'
        body += '<h3> RUT de la cuenta: ' + seller.bank_account_rut + '</h3>\n'
        body += '<h3> Email de cuenta: ' + seller.bank_account_email + '</h3>\n'
        body += '<h1>Los articulos comprados son los siguientes</h1>\n'
        for (let publication of publications) {
          let url: string =
            'http://localhost:4200/user/publication/' + publication.id_fixed
          body = values.sellers[sale.id_seller][publication.id_fixed]
            ? body +
              '<h2>' +
              publication.title +
              ': <span style="color: green">$CLP ' +
              values.sellers[sale.id_seller][publication.id_fixed] *
                publication.price +
              ' </span>' +
              '</h2>' +
              '<a href=' +
              url +
              '>Ver publicación</a>'
            : body
        }
      }
      mail.html = body
      let status = await MAIL(mail)
      transaction.commit()
      return { data: status, error: null }
    } catch (e: any) {
      transaction.rollback()
      return { data: null, error: e }
    }
  }

  async function getSalesByUser(id_user: string) {
    try {
      const Sale = models.sale
      const Stock = models.stock
      const Publication = models.publication
      const Files = models.publication_file
      const Seller = models.seller
      const ContentState = models.content_state
      Files.belongsTo(Publication, {
        foreignKey: 'id_fixed',
      })
      Publication.hasMany(Files, { foreignKey: 'id_fixed' })
      const sales = await Sale.findAll({
        where: { id_user: id_user },
        raw: true,
        nest: true,
      })
      for (let sale of sales) {
        sale.sale_state = await ContentState.findOne({
          where: { id_state: sale.sale_state },
          raw: true,
        })
        sale.store = await Seller.findOne({
          where: { id_seller: sale.id_seller },
          attributes: { exclude: ['id_seller', 'id_user'] },
          raw: true,
        })
        const ids = await Stock.findAll({
          attributes: ['id_fixed'],
          where: { id_sale: sale.id_sale },
          raw: true,
        })
        let ids_fixed: Array<string> = []
        for (let id of ids) {
          if (!ids_fixed.includes(ids.id_fixed)) {
            ids_fixed.push(id.id_fixed)
          }
        }
        sale.publications = await Publication.findAll({
          where: { id_fixed: ids_fixed },
          include: [{ model: Files }],
          raw: true,
          nest: true,
        })
        for (let publication of sale.publications) {
          let quantity = 0
          for (let id of ids) {
            quantity =
              id.id_fixed === publication.id_fixed ? quantity + 1 : quantity
          }
          publication.quantity = quantity
        }
      }
      return { data: sales, error: null }
    } catch (e) {
      return { data: null, error: e }
    }
  }

  async function getSalesBySeller(id_seller: string) {
    try {
      const Sale = models.sale
      const Publication = models.publication
      const Files = models.publication_file
      const User = models.user
      const ContentState = models.content_state
      Files.belongsTo(Publication, {
        foreignKey: 'id_fixed',
      })
      Publication.hasMany(Files, { foreignKey: 'id_fixed' })
      const sales = await Sale.findAll({
        where: { id_seller: id_seller },
        raw: true,
        nest: true,
      })
      for (let sale of sales) {
        sale.sale_state = await ContentState.findOne({
          where: { id_state: sale.sale_state },
          raw: true,
        })
        sale.buyer = await User.findOne({
          where: { id_user: sale.id_user },
          attributes: {
            exclude: ['id_user', 'user_password', 'seller', 'created_at'],
          },
          raw: true,
        })
      }
      return { data: sales, error: null }
    } catch (e) {
      return { data: null, error: e }
    }
  }

  async function getSaleDetailUser(id_sale: string) {
    try {
      const Sale = models.sale
      const Seller = models.seller
      const ContentState = models.content_state
      const Stock = models.stock
      const Publication = models.publication
      const Files = models.publication_file
      const SaleFiles = models.sale_file
      Files.belongsTo(Publication, {
        foreignKey: 'id_fixed',
      })
      SaleFiles.belongsTo(Sale, {
        foreignKey: 'id_sale',
      })
      Publication.hasMany(Files, { foreignKey: 'id_fixed' })
      Sale.hasOne(SaleFiles, {
        foreignKey: 'id_sale',
      })
      const sale = await Sale.findOne({
        where: { id_sale: id_sale },
        include: [{ model: SaleFiles }],
        raw: true,
        nest: true,
      })
      sale.sale_state = await ContentState.findOne({
        where: { id_state: sale.sale_state },
        raw: true,
      })
      sale.store = await Seller.findOne({
        where: { id_seller: sale.id_seller },
        attributes: {
          exclude: ['id_seller', 'id_user'],
        },
        raw: true,
      })
      const ids = await Stock.findAll({
        attributes: ['id_fixed'],
        where: { id_sale: sale.id_sale },
        raw: true,
      })
      let ids_fixed: Array<string> = []
      for (let id of ids) {
        if (!ids_fixed.includes(id.id_fixed)) {
          ids_fixed.push(id.id_fixed)
        }
      }
      sale.publications = await Publication.findAll({
        where: { id_fixed: ids_fixed },
        raw: true,
      })
      for (let publication of sale.publications) {
        let quantity = 0
        publication.files = await Files.findAll({
          where: { id_fixed: publication.id_fixed },
        })
        for (let id of ids) {
          quantity =
            id.id_fixed === publication.id_fixed ? quantity + 1 : quantity
        }
        publication.quantity = quantity
      }
      return { data: sale, error: null }
    } catch (e) {
      return { data: null, error: e }
    }
  }

  async function getSaleDetailSeller(id_sale: string) {
    try {
      const Sale = models.sale
      const User = models.user
      const ContentState = models.content_state
      const Stock = models.stock
      const Publication = models.publication
      const Files = models.publication_file
      const SaleFile = models.sale_file
      SaleFile.belongsTo(Sale, {
        foreignKey: 'id_sale',
      })
      Sale.hasOne(SaleFile, {
        foreignKey: 'id_sale',
      })
      const sale = await Sale.findOne({
        where: { id_sale: id_sale },
        include: [{ model: SaleFile }],
        raw: true,
        nest: true,
      })
      sale.sale_state = await ContentState.findOne({
        where: { id_state: sale.sale_state },
        raw: true,
      })
      sale.buyer = await User.findOne({
        where: { id_user: sale.id_user },
        attributes: {
          exclude: ['id_user, user_password, seller, is_admin, created_at'],
        },
        raw: true,
      })
      const ids = await Stock.findAll({
        attributes: ['id_fixed'],
        where: { id_sale: sale.id_sale },
        raw: true,
      })
      let ids_fixed: Array<string> = []
      for (let id of ids) {
        if (!ids_fixed.includes(id.id_fixed)) {
          ids_fixed.push(id.id_fixed)
        }
      }
      sale.publications = await Publication.findAll({
        where: { id_fixed: ids_fixed },
        raw: true,
      })
      for (let publication of sale.publications) {
        let quantity = 0
        publication.files = await Files.findAll({
          where: { id_fixed: publication.id_fixed },
        })
        for (let id of ids) {
          quantity =
            id.id_fixed === publication.id_fixed ? quantity + 1 : quantity
        }
        publication.quantity = quantity
      }
      return { data: sale, error: null }
    } catch (e) {
      return { data: null, error: e }
    }
  }

  async function uploadFile(values: any) {
    try {
      const SaleFile = models.sale_file
      const file = await SaleFile.create(
        {
          ...values.file,
          id_sale: values.id_sale,
        },
        {
          raw: true,
          nest: true,
        }
      )
      return { data: file, error: null }
    } catch (e) {
      console.log(e)
      return { data: null, error: e }
    }
  }

  async function deleteFile(id_file: string) {
    try {
      const SaleFile = models.sale_file
      const file = await SaleFile.destroy({
        where: { id_file: id_file },
      })
      return { data: file, error: null }
    } catch (e) {
      console.log(e)
      return { data: null, error: e }
    }
  }

  async function acceptSale(id_sale: string, date: Date, description: string) {
    const transaction = await models.sequelize.transaction()
    try {
      const Sale = models.sale
      const Publication = models.publication
      const Region = models.region
      const Commune = models.commune
      const Address = models.publication_address
      const User = models.user
      const Seller = models.seller
      const Stock = models.stock
      const ContentStates = models.content_state
      Publication.hasOne(Address, { foreignKey: 'id_fixed' })
      Address.belongsTo(Publication, {
        foreignKey: 'id_fixed',
      })
      const state = await ContentStates.findOne({
        where: { content_state: 'completado' },
        raw: true,
        nest: true,
      })
      const sale = await Sale.findOne({
        where: { id_sale: id_sale },
      })
      await Sale.update(
        {
          ...sale,
          sale_state: state.id_state,
          date_pickup: date,
          description: description,
          updated_at: new Date(),
        },
        {
          where: { id_sale: id_sale },
        }
      )
      const stocks = await Stock.findAll({
        where: { id_sale: id_sale },
        raw: true,
        nest: true,
      })
      for (let stock of stocks) {
        await Stock.update(
          {
            ...stock,
            stock_state: state.id_state,
          },
          {
            where: { id_stock: stock.id_stock },
          }
        )
      }
      const publications = await Publication.findAll({
        where: { id_fixed: Object.keys(sale.fixeds) },
        include: [{ model: Address }],
        raw: true,
        nest: true,
      })
      const user = await User.findOne({
        where: { id_user: sale.id_user },
        raw: true,
        nest: true,
      })
      const seller = await Seller.findOne({
        where: { id_seller: sale.id_seller },
        raw: true,
        nest: true,
      })
      let mail = entity.optionsTemplate
      let body = ''
      mail.to = user.email
      mail.subject = 'Compra Subaster Aceptada'
      body +=
        '<h2>Tu compra en ' +
        seller.store_name +
        ' con N°: ' +
        sale.id_sale +
        ' ha sido aceptada</h2>'
      body += '<h2>Podras retirar tus pedidos desde ' + date + '</h2>'
      for (let publication of publications) {
        const commune = await Commune.findOne({
          where: { id_commune: publication.publication_address.id_commune },
        })
        const region = await Region.findOne({
          where: { id_region: publication.publication_address.id_region },
        })
        body += '<h2>Para el producto: ' + publication.title + '</h2>'
        body +=
          '<h2>La dirección es: ' +
          publication.publication_address.address +
          ',' +
          commune.commune +
          ',' +
          region.region +
          ','
        ',' + '</h2>'
        body +=
          '<h2>Tambien puede copiar lo siguiente en el buscador de google maps para encontrar la dirección exacta:' +
          publication.publication_address.lat +
          ',' +
          publication.publication_address.lng +
          '</h2>'
      }
      body +=
        '<h2>En caso de ser necesario puedes comunicarte directamente con el vendedor a través de los siguientes canales</h2>'
      body += '<h2>Correo electrónico:' + seller.email + '</h2>'
      body += '<h2>Teléfono:' + seller.phone + '</h2>'
      body += description ? '<h2>Información extra</h2>' : ''
      body += description ? '<p>' + description + '</p>' : ''
      mail.html = body
      await MAIL(mail)
      transaction.commit()
      return { data: sale, error: null }
    } catch (e) {
      transaction.rollback()
      console.log(e)
      return { data: null, error: e }
    }
  }

  async function rejectSale(id_sale: string, description: string) {
    const transaction = await models.sequelize.transaction()
    try {
      const Sale = models.sale
      const Publication = models.publication
      const User = models.user
      const Seller = models.seller
      const Stock = models.stock
      const ContentStates = models.content_state
      const state = await ContentStates.findAll({
        where: { content_state: ['disponible', 'rechazado'] },
        raw: true,
        nest: true,
      })
      const sale = await Sale.findOne({
        where: { id_sale: id_sale },
        raw: true,
        nest: true,
      })
      await Sale.update(
        {
          ...sale,
          sale_state: state.filter((s: any) =>
            s.content_state === 'rechazado' ? s : null
          )[0].id_state,
          description: description,
          updated_at: new Date(),
        },
        {
          where: { id_sale: id_sale },
        }
      )
      const stocks = await Stock.findAll({
        where: { id_sale: id_sale },
        raw: true,
        nest: true,
      })
      for (let stock of stocks) {
        await Stock.update(
          {
            ...stock,
            stock_state: state.filter((s: any) =>
              s.content_state === 'disponible' ? s : null
            )[0].id_state,
          },
          {
            where: { id_stock: stock.id_stock },
          }
        )
      }
      const publications = await Publication.findAll({
        where: { id_fixed: Object.keys(sale.fixeds) },
        raw: true,
        nest: true,
      })
      for (let publication of publications) {
        await Publication.update(
          {
            ...publication,
            current_stock:
              publication.current_stock +
              stocks.filter((s: any) =>
                s.id_fixed === publication.id_fixed ? s : null
              ).length,
          },
          {
            where: { id_fixed: publication.id_fixed },
          }
        )
      }
      const user = await User.findOne({
        where: { id_user: sale.id_user },
        raw: true,
        nest: true,
      })

      const seller = await Seller.findOne({
        where: { id_seller: sale.id_seller },
        raw: true,
        nest: true,
      })
      let mail = entity.optionsTemplate
      let body = ''
      mail.to = user.email
      mail.subject = 'Compra Subaster Rechazada'
      body +=
        '<h2>Tu compra en ' +
        seller.store_name +
        ' con N°: ' +
        sale.id_sale +
        ' ha sido rechazada</h2>'
      body += description ? '<h2>Información del rechazo de la venta</h2>' : ''
      body += description ? '<p>' + description + '</p>' : ''
      mail.html = body
      await MAIL(mail)
      transaction.commit()
      return { data: sale, error: null }
    } catch (e) {
      transaction.rollback()
      console.log(e)
      return { data: null, error: e }
    }
  }
}

export default querySale
