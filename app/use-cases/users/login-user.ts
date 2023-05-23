import { auth } from '../../functions/app'

const login = (loginUsers: Function, userDb: any) => {
  return async function get(info: Object) {
    let data = await loginUsers(info)

    data = {
      email: data.getEmail(),
      password: data.getPassword(),
    }

    const { data: res, error: err } = await userDb.loginUser(data)

    if (res) {
      const msg = `User has been finded.`
      const email: string = res.email
      const id_user: string = res.id_user
      const seller: boolean = res.seller
      const is_admin: boolean = res.is_admin
      console.log(res)
      return {
        status: 200,
        msg: msg,
        data: res,
        token: auth.authCreate({ email, id_user, seller, is_admin }),
      }
    } else {
      throw err
    }
  }
}

export default login
