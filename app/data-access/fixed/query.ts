import fixed_address from '../fixed_address/app'
import commentDb from '../comment/app'
const { v4: uuidv4 } = require('uuid')

const queryFixed = (conn: any, models: any) => {
  return Object.freeze({
    post,
    getPublication,
    getPublications,
    getAllPublicationsForAdmin,
    getSellerPublications,
    getRegionPublications,
    updatePublicationInfo,
    getStocks,
    reActivate,
    closePublication,
    closePublicationByAdmin,
    openPublication,
    openPublicationByAdmin,
    getHomeInfo,
  })

  async function post(values: any) {
    const transaction = await models.sequelize.transaction()
    try {
      const Publication = models.publication
      const states = models.content_state
      const state = await states.findOne({
        where: { content_state: 'disponible' },
        raw: true,
      })
      const { address, files, ...rest } = values
      const publication = await Publication.create(
        {
          ...rest,
          current_stock: rest.stock,
          content_state: state.id_state,
          created_at: new Date(),
        },
        {
          raw: true,
        }
      )
      const PublicationAddress = models.publication_address
      const fixedAddress = await PublicationAddress.create(
        {
          ...address,
          id_commune: address.commune,
          id_region: address.region,
          id_fixed: publication.id_fixed,
        },
        {
          raw: true,
        }
      )
      const PublicationFile = models.publication_file
      const [fixedFiles, created] = await PublicationFile.bulkCreate(
        files.map((file: any) => {
          return { ...file, id_fixed: publication.id_fixed }
        })
      )
      publication['files'] = fixedFiles
      publication['address'] = fixedAddress
      await transaction.commit()
      return { data: publication, error: null }
    } catch (e: any) {
      await transaction.rollback()
      return { data: null, error: e }
    }
  }
  async function getSellerPublications(id_seller: string) {
    try {
      const Publication = models.publication
      const PublicationAddress = models.publication_address
      const PublicationFile = models.publication_file
      let publications = await Publication.findAll({
        where: { id_seller: id_seller },
        raw: true,
      })
      for (let publication of publications) {
        publication.files = await PublicationFile.findAll({
          where: { id_fixed: publication.id_fixed },
          raw: true,
        })
        publication.address = await PublicationAddress.findOne({
          where: { id_fixed: publication.id_fixed },
          raw: true,
        })
      }
      return { data: publications, error: null }
    } catch (e: any) {
      return { data: null, error: e }
    }
  }

  async function getPublications(filters: any) {
    try {
      const Publication = models.publication
      const Files = models.publication_file
      const Address = models.publication_address
      const ContentState = models.content_state
      Publication.hasMany(Files, { foreignKey: 'id_fixed' })
      Publication.hasOne(Address, { foreignKey: 'id_fixed' })
      Files.belongsTo(Publication, {
        foreignKey: 'id_fixed',
      })
      Address.belongsTo(Publication, {
        foreignKey: 'id_fixed',
      })
      let pubFilters: any = {}
      if (filters.category && filters.category.length > 0) {
        pubFilters['category'] = filters.category
      }
      if (filters.unity && filters.unity.length > 0) {
        pubFilters['unity'] = filters.unity
      }
      if (filters.product_state && filters.product_state.length > 0) {
        pubFilters['product_state'] = filters.product_state
      }
      if (filters.title && filters.title.length > 0) {
        const Op = models.Sequelize.Op
        pubFilters['title'] = { [Op.match]: filters.title }
      }
      const state = await ContentState.findOne({
        where: { content_state: 'disponible' },
        raw: true,
        nest: true,
      })
      let publications = await Publication.findAll({
        where: { ...pubFilters, content_state: state.id_state },
        include: [{ model: Files }, { model: Address }],
        limit: filters.limit ? filters.limit : null,
        offset: filters.offset ? filters.offset : 0,
      })
      let count = await Publication.count({
        where: { ...pubFilters, content_state: state.id_state },
      })
      return { data: { count: count, items: publications }, error: null }
    } catch (e: any) {
      return { data: null, error: e }
    }
  }

  async function getAllPublicationsForAdmin(filters: any) {
    try {
      const Publication = models.publication
      const Files = models.publication_file
      const Address = models.publication_address
      Publication.hasMany(Files, { foreignKey: 'id_fixed' })
      Publication.hasOne(Address, { foreignKey: 'id_fixed' })
      Files.belongsTo(Publication, {
        foreignKey: 'id_fixed',
      })
      Address.belongsTo(Publication, {
        foreignKey: 'id_fixed',
      })
      let pubFilters: any = {}
      if (filters.category && filters.category.length > 0) {
        pubFilters['category'] = filters.category
      }
      if (filters.unity && filters.unity.length > 0) {
        pubFilters['unity'] = filters.unity
      }
      if (filters.product_state && filters.product_state.length > 0) {
        pubFilters['product_state'] = filters.product_state
      }
      if (filters.title && filters.title.length > 0) {
        const Op = models.Sequelize.Op
        pubFilters['title'] = { [Op.match]: filters.title }
      }
      let publications = await Publication.findAll({
        where: { ...pubFilters },
        include: [{ model: Files }, { model: Address }],
        limit: filters.limit ? filters.limit : null,
        offset: filters.offset ? filters.offset : 0,
      })
      let count = await Publication.count({
        where: { ...pubFilters },
      })
      return { data: { count: count, items: publications }, error: null }
    } catch (e: any) {
      return { data: null, error: e }
    }
  }

  async function getStocks(ids: Array<string>) {
    try {
      const Publication = models.publication
      const Files = models.publication_file
      const Address = models.publication_address
      Publication.hasMany(Files, { foreignKey: 'id_fixed' })
      Publication.hasOne(Address, { foreignKey: 'id_fixed' })
      Files.belongsTo(Publication, {
        foreignKey: 'id_fixed',
      })
      Address.belongsTo(Publication, {
        foreignKey: 'id_fixed',
      })
      let publications = await Publication.findAll({
        where: { id_fixed: ids },
        include: [{ model: Files }, { model: Address }],
      })
      return { data: publications, error: null }
    } catch (e) {
      return { data: null, error: e }
    }
  }

  async function getRegionPublications(id_region: string) {
    try {
      const Publication = models.publication
      const PublicationAddress = models.publication_address
      const PublicationFile = models.publication_file
      let publicationsAddresses = await PublicationAddress.findAll({
        where: { id_region: id_region },
        raw: true,
        nest: true,
      })
      let publications = await Publication.findAll({
        where: {
          id_fixed: publicationsAddresses.map(
            (address: any) => address.id_fixed
          ),
        },
        raw: true,
        nest: true,
      })
      for (let publication of publications) {
        publication.files = await PublicationFile.findAll({
          where: { id_fixed: publication.id_fixed },
          raw: true,
        })
        publication.address = publicationsAddresses.filter((address: any) =>
          address.id_fixed === publication.id_fixed ? address : null
        )[0]
      }
      return { data: publications, error: null }
    } catch (e: any) {
      return { data: null, error: e }
    }
  }

  async function getPublication(id_fixed: string) {
    try {
      const Publication = models.publication
      const PublicationFile = models.publication_file
      const ContentState = models.content_state
      let publication = await Publication.findOne({
        where: { id_fixed: id_fixed },
        raw: true,
      })
      publication.comments = (
        await commentDb.getComments(publication.id_fixed)
      ).data
      publication.files = await PublicationFile.findAll({
        where: { id_fixed: publication.id_fixed },
        raw: true,
      })
      const { data: address, error: addressError } =
        await fixed_address.getAddress(publication.id_fixed)
      if (addressError) {
        throw addressError
      }
      publication.address = address
      publication.content_state = await ContentState.findOne({
        where: { id_state: publication.content_state },
        raw: true,
      })
      return { data: publication, error: null }
    } catch (e: any) {
      return { data: null, error: e }
    }
  }

  async function closePublication(id_fixed: string) {
    try {
      const Publication = models.publication
      const Stock = models.stock
      const ContentStates = models.content_state

      const state = await ContentStates.findAll({
        where: { content_state: ['inactiva', 'disponible'] },
        raw: true,
      })
      const publicationDeleted = await Publication.update(
        {
          content_state: state.filter((v: any) =>
            v.content_state === 'inactiva' ? v : null
          )[0].id_state,
        },
        {
          where: { id_fixed: id_fixed },
          raw: true,
          returning: true,
        }
      )
      await Stock.update(
        {
          stock_state: state.filter((v: any) =>
            v.content_state === 'inactiva' ? v : null
          )[0].id_state,
        },
        {
          where: {
            id_fixed: id_fixed,
            stock_state: state.filter((v: any) =>
              v.content_state === 'disponible' ? v : null
            )[0].id_state,
          },
        }
      )
      return { data: publicationDeleted[1][0], error: null }
    } catch (e: any) {
      return { data: null, error: e }
    }
  }

  async function closePublicationByAdmin(id_fixed: string) {
    try {
      const Publication = models.publication
      const Stock = models.stock
      const ContentStates = models.content_state

      const state = await ContentStates.findAll({
        where: { content_state: ['inactiva', 'disponible'] },
        raw: true,
      })
      const publicationDeleted = await Publication.update(
        {
          content_state: state.filter((v: any) =>
            v.content_state === 'inactiva' ? v : null
          )[0].id_state,
          closed_by_admin: true,
        },
        {
          where: { id_fixed: id_fixed },
          raw: true,
          returning: true,
        }
      )
      await Stock.update(
        {
          stock_state: state.filter((v: any) =>
            v.content_state === 'inactiva' ? v : null
          )[0].id_state,
        },
        {
          where: {
            id_fixed: id_fixed,
            stock_state: state.filter((v: any) =>
              v.content_state === 'disponible' ? v : null
            )[0].id_state,
          },
        }
      )
      return { data: publicationDeleted[1][0], error: null }
    } catch (e: any) {
      return { data: null, error: e }
    }
  }

  async function openPublication(id_fixed: string) {
    try {
      const Publication = models.publication
      const Stock = models.stock
      const ContentStates = models.content_state

      const state = await ContentStates.findAll({
        where: { content_state: ['inactiva', 'disponible'] },
        raw: true,
      })
      const publicationActivated = await Publication.update(
        {
          content_state: state.filter((v: any) =>
            v.content_state === 'disponible' ? v : null
          )[0].id_state,
        },
        {
          where: { id_fixed: id_fixed },
          raw: true,
          returning: true,
        }
      )
      await Stock.update(
        {
          stock_state: state.filter((v: any) =>
            v.content_state === 'disponible' ? v : null
          )[0].id_state,
        },
        {
          where: {
            id_fixed: id_fixed,
            stock_state: state.filter((v: any) =>
              v.content_state === 'inactiva' ? v : null
            )[0].id_state,
          },
        }
      )
      return { data: publicationActivated[1][0], error: null }
    } catch (e: any) {
      return { data: null, error: e }
    }
  }

  async function openPublicationByAdmin(id_fixed: string) {
    try {
      const Publication = models.publication
      const Stock = models.stock
      const ContentStates = models.content_state

      const state = await ContentStates.findAll({
        where: { content_state: ['inactiva', 'disponible'] },
        raw: true,
      })
      const publicationActivated = await Publication.update(
        {
          content_state: state.filter((v: any) =>
            v.content_state === 'disponible' ? v : null
          )[0].id_state,
          closed_by_admin: false,
        },
        {
          where: { id_fixed: id_fixed },
          raw: true,
          returning: true,
        }
      )
      await Stock.update(
        {
          stock_state: state.filter((v: any) =>
            v.content_state === 'disponible' ? v : null
          )[0].id_state,
        },
        {
          where: {
            id_fixed: id_fixed,
            stock_state: state.filter((v: any) =>
              v.content_state === 'inactiva' ? v : null
            )[0].id_state,
          },
        }
      )
      return { data: publicationActivated[1][0], error: null }
    } catch (e: any) {
      return { data: null, error: e }
    }
  }

  async function reActivate(id_fixed: string) {
    const transaction = await models.sequelize.transaction()
    try {
      const Publication = models.publication
      const Stock = models.stock
      const ContentStates = models.content_state

      const state = await ContentStates.findOne({
        where: { content_state: 'disponible' },
        raw: true,
        nest: true,
      })
      const publication = await Publication.findOne({
        where: { id_fixed: id_fixed },
        raw: true,
        nest: true,
      })
      const publicationActivated = await Publication.update(
        {
          ...publication,
          content_state: state.id_state,
          current_stock: publication.stock,
        },
        {
          where: { id_fixed: id_fixed },
          raw: true,
          returning: true,
        }
      )
      for (let i = 0; i < publication.stock; i++) {
        await Stock.create({
          id_fixed: publication.id_fixed,
          stock_state: state.id_state,
        })
      }
      transaction.commit()
      return { data: publicationActivated[1][0], error: null }
    } catch (e: any) {
      transaction.rollback()
      return { data: null, error: e }
    }
  }

  async function updatePublicationInfo(values: any) {
    const transaction = await models.sequelize.transaction()
    try {
      const id_fixed = values.id_fixed
      const Publication = models.publication
      const publication = await Publication.findOne({
        where: { id_fixed: id_fixed },
      })
      if (values.current_stock !== publication.current_stock) {
        const Stock = models.stock
        const ContentStates = models.content_state
        const stocks: Array<any> = await Stock.findAll({
          where: { id_fixed: id_fixed },
          raw: true,
        })
        const state = await ContentStates.findOne({
          where: { content_state: 'disponible' },
          raw: true,
        })
        if (values.current_stock > publication.current_stock) {
          for (
            let i = 0;
            i < values.current_stock - publication.current_stock;
            i++
          ) {
            const newStock = await Stock.create(
              {
                id_stock: uuidv4(),
                id_fixed: id_fixed,
                stock_state: state.id_state,
              },
              { raw: true }
            )
            if (!newStock?.id_stock) {
              throw new Error('Error al actualizar publicación')
            }
          }
        } else {
          if (
            publication.current_stock - values.current_stock >
            stocks.filter((stock) =>
              stock.stock_state === state.id_state ? stock : null
            ).length
          ) {
            throw new Error('Error al actualizar publicación')
          }
          const avaibles = stocks.filter((stock) =>
            stock.stock_state === state.id_state ? stock : null
          )
          for (
            let i = 0;
            i < publication.current_stock - values.current_stock;
            i++
          ) {
            const deletedStock = await Stock.destroy({
              where: { id_stock: avaibles[i].id_stock },
              raw: true,
            })
            if (!deletedStock || deletedStock === 0) {
              throw new Error('Error al actualizar publicación')
            }
          }
        }
        const updated = await Publication.update(values, {
          where: { id_fixed: id_fixed },
          raw: true,
          returning: true,
        })
        if (!updated[0] || updated[0] === 0) {
          throw new Error('Error al actualizar publicación')
        }
        await transaction.commit()
        return { data: updated[1], error: null }
      } else {
        const updated = await Publication.update(values, {
          where: { id_fixed: id_fixed },
          raw: true,
          returning: true,
        })
        console.log(updated)
        if (!updated[0] || updated[0] === 0) {
          throw new Error('Error al actualizar publicación')
        }
        await transaction.commit()
        return { data: updated[1], error: null }
      }
    } catch (e: any) {
      console.log(e)
      await transaction.rollback()
      return { data: null, error: e }
    }
  }

  async function getHomeInfo() {
    try {
      const User = models.user
      const ContentState = models.content_state
      const Publication = models.publication
      const Files = models.publication_file
      const totalWeight = await models.sequelize.query(
        'SELECT SUM(weight) as totalWeight FROM stock\n' +
          'INNER JOIN content_state ON id_state = stock_state\n' +
          'INNER JOIN fixed ON fixed.id_fixed = stock.id_fixed\n' +
          "WHERE id_sale IS NOT NULL AND content_state.content_state = 'completado' ",
        { raw: true, nest: true }
      )
      const state = await ContentState.findOne({
        where: { content_state: 'disponible' },
        raw: true,
        nest: true,
      })
      const users = await User.count()
      const latest = await Publication.findAll({
        where: { content_state: state.id_state },
        raw: true,
        nest: true,
        order: [['created_at', 'DESC']],
        limit: 10,
      })
      for (let publication of latest) {
        publication.files = await Files.findAll({
          where: { id_fixed: publication.id_fixed },
          raw: true,
          nest: true,
        })
      }
      const moreComments = await models.sequelize.query(
        'SELECT id_fixed, COUNT(id_fixed) AS "comments" FROM "comment" GROUP BY id_fixed ORDER BY "comments" DESC LIMIT 10',
        { raw: true, nest: true }
      )
      const moreCommentsPublications = await Publication.findAll({
        where: {
          id_fixed: moreComments.map((info: any) => info.id_fixed),
          content_state: state.id_state,
        },
        raw: true,
        nest: true,
      })
      for (let publication of moreCommentsPublications) {
        publication.files = await Files.findAll({
          where: { id_fixed: publication.id_fixed },
          raw: true,
          nest: true,
        })
      }
      return {
        data: {
          users,
          ...totalWeight[0],
          moreComments: moreCommentsPublications,
          latest,
        },
        error: null,
      }
    } catch (e) {
      return { data: null, error: e }
    }
  }
}
export default queryFixed
