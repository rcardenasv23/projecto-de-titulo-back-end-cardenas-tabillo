import { encrypt } from '../../functions/app'
import userAddressDb from '../user_address/app'
import userFiles from '../user-files/app'
import entity from '../../entities/mailer/app'
import MAIL from '../../functions/mailer'

const queryUser = (conn: any, models: any) => {
  return Object.freeze({
    createUser,
    loginUser,
    getUser,
    updateUser,
    updateUserField,
    recoveryPassword,
    updateUserPassword,
  })

  async function createUser(user: any) {
    const transaction = await models.sequelize.transaction()
    try {
      const User = models.user
      const { address, files, ...rest } = user
      const userExists = await User.findOne({ where: { email: user.email } })
      if (userExists !== null) {
        throw new Error('User already exists.')
      }
      const createdUser = await User.create(rest)
      if (!createdUser.id_user) {
        throw new Error('Error while creating user.')
      }
      address.id_user = createdUser.id_user
      const addressInserted: any = await userAddressDb.insertAddress(address)
      if (addressInserted.error) {
        throw address.error
      }
      if (user.files) {
        const filesInserted = await userFiles.insertFiles(files, {
          id_user: createdUser.id_user,
        })
        if (filesInserted.error) {
          throw filesInserted.error
        }
      }
      await transaction.commit()

      return { data: user, error: null }
    } catch (e: any) {
      await transaction.rollback()
      return { data: null, error: e }
    }
  }

  async function updateUser(user: any) {
    try {
      const User = models.user
      const updatedUser: any = await User.update(user, {
        where: { email: user.email },
      })
      if (updatedUser.Errors) {
        throw updatedUser.Errors
      }
      return { data: updatedUser, error: null }
    } catch (e) {
      return { data: null, error: e }
    }
  }

  async function updateUserField(
    field: string,
    id_user: string,
    value: string | boolean
  ) {
    try {
      const User = models.user
      const change: any = {}
      change[field] = value
      const updatedUser = await User.update(change, {
        where: { id_user: id_user },
        raw: true,
      })
      return { data: updatedUser, error: null }
    } catch (e) {
      return { data: null, error: e }
    }
  }

  async function updateUserPassword(credentials: any) {
    try {
      const User = models.user
      let userExists = await User.findOne({
        where: { id_user: credentials.id_user },
        raw: true,
      })
      if (userExists === null) {
        return { errors: "User doesn't exists." }
      }
      if (
        await encrypt.compareString(
          credentials.current_password,
          userExists.user_password
        )
      ) {
        const updatedUser = await User.update(
          { user_password: credentials.new_password },
          {
            where: { id_user: credentials.id_user },
          }
        )
        if (updatedUser.errors) {
          throw new Error('Error while updating password.')
        }
        return {
          data: { ...userExists, user_password: credentials.new_password },
          error: null,
        }
      }
    } catch (e) {
      return { data: null, error: e }
    }
  }

  async function loginUser(credentials: any) {
    try {
      const User = models.user
      const Files = models.user_file
      let userExists = await User.findOne({
        where: { email: credentials.email },
        raw: true,
      })
      if (userExists === null) {
        return { errors: "User doesn't exists." }
      }
      if (
        await encrypt.compareString(
          credentials.password,
          userExists.user_password
        )
      ) {
        if (userExists.is_admin) {
          return { data: userExists, error: null }
        }
        const { data: address, error: addressError } =
          await userAddressDb.getAddress({ id_user: userExists.id_user })
        if (addressError) {
          throw new Error(addressError)
        }
        const files = await Files.findAll({
          attributes: ['id_file', 'url', 'extensions', 'width', 'height'],
          where: { id_user: userExists.id_user },
          raw: true,
        })
        userExists = { ...userExists, address: address, files: files }
        return { data: userExists, error: null }
      }
      throw new Error('Password is not correct.')
    } catch (e: any) {
      return { data: null, error: e }
    }
  }

  async function getUser(email: string) {
    try {
      const User = models.user
      const Files = models.user_file
      let userExists = await User.findOne({
        where: { email: email },
        raw: true,
      })
      if (userExists === null) {
        return { data: null, error: "User doesn't exists." }
      }
      let { data: address, error: addressError } =
        await userAddressDb.getAddress({
          id_user: userExists.id_user,
          email: email,
          user_password: userExists.user_password,
        })
      if (addressError) {
        throw new Error(addressError)
      }
      const files = await Files.findAll({
        attributes: ['id_file', 'url', 'extensions', 'width', 'height'],
        where: { id_user: userExists.id_user },
        raw: true,
      })
      userExists = { ...userExists, address: address, files: files }
      return { data: userExists, error: null }
    } catch (e) {
      return { data: null, error: e }
    }
  }

  async function recoveryPassword(email: string, phone: string) {
    const transaction = await models.sequelize.transaction()
    try {
      const randomstring = require('randomstring')
      const User = models.user
      const user = await User.findOne({
        where: { email: email, phone: phone },
        raw: true,
        nest: true,
      })
      if (!user.id_user) {
        throw 'No existe un usuario con las credenciales proporcionadas'
      }
      let newPassword = randomstring.generate({
        length: 9,
        charset: 'alphabetic',
      })
      const user_password = await encrypt.encryptString(newPassword)
      const updated = await User.update(
        {
          ...user,
          user_password: user_password,
        },
        {
          where: { email: email },
          raw: true,
          nest: true,
        }
      )
      let mail = entity.optionsTemplate
      let body =
        '<div style="text-align: center;">' +
        '<h1>Subaster</h1>' +
        '<h4 style="margin-top: 20px">¡Hola! Hemos visto que has perdido tu contraseña</h4>' +
        '<h4 style="margin-top: 20px">A continuación te adjuntamos tu contraseña, recuerda</h4>' +
        '<h4 style="margin-top: 20px">no compartir tu contraseña con nadie, si crees que alguien</h4>' +
        '<h4 style="margin-top: 20px">está usando tu cuenta sin tu consentimiento, contacta a</h4>' +
        '<h4 style="margin-top: 20px">Subaster. Saludos !</h4>' +
        '<h5>Contraseña: ' +
        newPassword +
        ' </h5>' +
        '</div>'
      mail.to = email
      mail.subject = 'Reinicio de Contraseña Subaster'
      mail.html = body
      await MAIL(mail)
      transaction.commit()
      return { data: updated, error: null }
    } catch (e: any) {
      transaction.rollback()
      return { data: null, error: e }
    }
  }

  async function deleteUser(idUser: number) {
    try {
      const User = models.user
      const deleted = User.destroy({ where: { id_user: idUser } })
      return { data: deleted, error: null }
    } catch (e: any) {
      return { data: null, error: e }
    }
  }
}

export default queryUser
