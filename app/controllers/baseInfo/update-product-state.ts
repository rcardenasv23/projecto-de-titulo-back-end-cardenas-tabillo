const updateProductState = (updateProductState: Function) => {
  return async function put(httpRequest: any) {
    try {
      const { id_pubs, product_state } = httpRequest.body
      const put = await updateProductState(id_pubs, product_state)
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 201,
        body: put,
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

export default updateProductState
