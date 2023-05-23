const updateProductState = (attributes: any) => {
  return async function put(id_pubs: string, product_state: string) {
    const { data: category, error } = await attributes.updateProductState(
      id_pubs,
      product_state
    )
    if (error) {
      throw error
    }

    return {
      status: 200,
      msg: 'Updated product state successfully',
      data: category,
    }
  }
}

export default updateProductState
