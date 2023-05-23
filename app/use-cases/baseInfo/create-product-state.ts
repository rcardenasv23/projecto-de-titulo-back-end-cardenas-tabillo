const createProductState = (attributes: any) => {
  return async function post(product_state: string) {
    const { data: res, error: err } = await attributes.createProductState(
      product_state
    )
    if (res) {
      const msg = `Product state has been created.`
      return {
        status: 200,
        msg: msg,
        data: res,
      }
    } else {
      throw err
    }
  }
}

export default createProductState
