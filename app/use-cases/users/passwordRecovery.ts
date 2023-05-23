const passwordRecovery = (userDb: any) => {
  return async function post(email: string, phone: string) {
    const { data: res, error: err } = await userDb.recoveryPassword(
      email,
      phone
    )

    if (res) {
      const msg = `User has been updated successfully.`
      return { status: 200, msg: msg, data: res }
    } else {
      throw new Error(err)
    }
  }
}

export default passwordRecovery
