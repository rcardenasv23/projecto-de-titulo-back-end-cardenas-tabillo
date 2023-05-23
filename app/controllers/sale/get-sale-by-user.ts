const getSaleByUser = (getSale: Function) => {
  return async function get(httpRequest: any) {
    try {
      const { id_user } = httpRequest.query
      const got = await getSale(id_user)
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 201,
        body: got,
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

export default getSaleByUser
