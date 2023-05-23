const getUser = (userDb: any) => {
  return async function get(jwtData: Object) {
    for (const val of Object.values(jwtData)) {
      if (val.email) {
        const { data: res, error: err } = await userDb.getUser(val.email)

        if (res) {
          const msg = `User has been finded.`
          return {
            status: 200,
            msg: msg,
            data: res,
          }
        } else {
          throw err
        }
      }
    }
    throw new Error('Email was not find.')
  }
}

export default getUser
