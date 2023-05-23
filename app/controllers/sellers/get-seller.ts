const seller = (getSeller: Function) => {
  return async function get(httpRequest: any) {
    try {
      const { id_user } = httpRequest.query.jwtData
      if (!id_user) {
        throw new Error('Id not found')
      }
      const posted = await getSeller(id_user)
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 201,
        body: posted,
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

export default seller
