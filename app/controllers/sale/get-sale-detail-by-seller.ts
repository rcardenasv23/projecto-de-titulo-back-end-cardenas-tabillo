const getSaleDetailBySeller = (getSale: Function) => {
  return async function get(httpRequest: any) {
    try {
      const { id_sale } = httpRequest.query
      const got = await getSale(id_sale)
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

export default getSaleDetailBySeller
