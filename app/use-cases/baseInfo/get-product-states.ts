const productStates = (attributes: any) => {
  return async function get() {
    const { data: productStates, error: errProductStates } =
      await attributes.getProductStates()
    if (errProductStates) {
      throw errProductStates
    }

    return {
      status: 200,
      msg: 'Country information got',
      data: productStates,
    }
  }
}

export default productStates
