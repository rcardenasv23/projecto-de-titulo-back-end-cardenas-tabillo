import userDb from '../users/app'
import fixedDb from '../fixed/app'

const querySeller = (conn: any, models: any) => {
  return Object.freeze({
    join,
    getSeller,
    update,
  })

  async function join(values: any) {
    const transaction = await models.sequelize.transaction()
    try {
      const User = models.user
      const checkValidUser = await User.findAll({
        where: { email: values.email },
        raw: true,
      })
      if (
        checkValidUser.filter((user: any) =>
          user.email === values.email && !(user.id_user === values.id_user)
            ? user
            : null
        ).length > 0
      ) {
        throw new Error('Email ya existente para otro usuario.')
      }
      const Seller = models.seller
      const checkValidSellerMail = await Seller.findOne({
        where: { email: values.email },
        raw: true,
      })
      if (checkValidSellerMail?.id_seller) {
        throw new Error('Email ya existente para otro vendedor.')
      }
      const updateUser = await userDb.updateUserField(
        'seller',
        values.id_user,
        true
      )
      if (updateUser.data) {
        const newSeller = await Seller.create(values)
        if (newSeller.Errors) {
          throw new Error('Error while creating seller.')
        }
        await transaction.commit()

        return { data: newSeller, error: null }
      }
      throw new Error('Error while updating user.')
    } catch (e: any) {
      await transaction.rollback()
      return { data: null, error: e }
    }
  }

  async function update(values: any) {
    try {
      const Seller = models.seller
      const updatedSeller: any = await Seller.update(values, {
        where: { id_seller: values.id_seller },
        returning: true,
        plain: true,
      })
      if (!updatedSeller[1].id_seller) {
        throw 'Error al actualizar vendedor'
      }
      return { data: updatedSeller[1], error: null }
    } catch (e) {
      return { data: null, error: e }
    }
  }

  async function getSeller(id_user: string) {
    try {
      const Seller = models.seller
      const Files = models.seller_file
      const seller = await Seller.findOne({
        where: { id_user: id_user },
        raw: true,
      })
      const files = await Files.findAll({
        attributes: ['id_file', 'url', 'extensions', 'width', 'height'],
        where: { id_seller: seller.id_seller },
        raw: true,
      })
      seller.files = files
      const { data, error } = await fixedDb.getSellerPublications(
        seller.id_seller
      )
      if (error) {
        throw error
      }
      seller.publications = data
      return { data: seller, error: null }
    } catch (e) {
      return { data: null, error: e }
    }
  }
}
export default querySeller
