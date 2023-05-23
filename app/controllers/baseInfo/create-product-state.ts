const createProductState = (createProductState: Function) => {
  return async function post(httpRequest: any) {
    try {
      const { product_state } = httpRequest.body
      const posted = await createProductState(product_state)
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

export default createProductState
