const updateUserPassword = (updatePassword: Function, userDb: any) => {
  return async function put(info: Object) {
    let data = await updatePassword(info)
    data = {
      id_user: data.getID(),
      current_password: data.getCurrentPassword(),
      new_password: await data.getNewPassword(),
    }

    const { data: res, error: err } = await userDb.updateUserPassword(data)

    if (res) {
      const msg = `User has been updated successfully.`
      return { status: 200, msg: msg, data: res }
    } else {
      throw new Error(err)
    }
  }
}

export default updateUserPassword
