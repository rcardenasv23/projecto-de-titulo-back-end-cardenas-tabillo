const recovery = (passwordRecovery: Function) => {
  return async function post(httpRequest: any) {
    try {
      const { email, phone } = httpRequest.body
      if (!email || !phone) {
        throw 'Please fill all the fields'
      }
      const posted = await passwordRecovery(email, phone)
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 201,
        body: { posted },
      }
    } catch (e: any) {
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 400,
        body: {
          error: e.message,
        },
      }
    }
  }
}

export default recovery
