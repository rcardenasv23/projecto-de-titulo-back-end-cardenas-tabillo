const rejectSale = (rejectSale: Function) => {
  return async function post(httpRequest: any) {
    try {
      const { id_sale, description } = httpRequest.body
      if (!id_sale || !description) {
        throw 'Required id_sale and description'
      }
      const posted = await rejectSale(id_sale, description)
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

export default rejectSale
