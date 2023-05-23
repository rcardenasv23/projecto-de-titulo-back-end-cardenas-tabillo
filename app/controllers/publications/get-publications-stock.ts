const publicationsStock = (getPublicationsStock: Function) => {
  return async function post(httpRequest: any) {
    try {
      const { ids } = httpRequest.body
      console.log(ids)
      const got = await getPublicationsStock(ids)
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

export default publicationsStock
