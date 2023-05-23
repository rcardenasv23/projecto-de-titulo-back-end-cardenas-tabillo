const getSalesBySeller = (getSales: Function) => {
  return async function get(httpRequest: any) {
    try {
      const { id_seller } = httpRequest.query
      const got = await getSales(id_seller)
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

export default getSalesBySeller
