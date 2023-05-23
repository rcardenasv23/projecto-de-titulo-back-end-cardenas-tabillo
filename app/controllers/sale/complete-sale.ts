const finishSale = (completeSale: Function) => {
  return async function post(httpRequest: any) {
    try {
      const { id_sale, datePickUp, description } = httpRequest.body
      if (!id_sale || !datePickUp) {
        throw 'Required id_sale and datePickUP'
      }
      const posted = await completeSale(id_sale, datePickUp, description)
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

export default finishSale
