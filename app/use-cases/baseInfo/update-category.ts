const updateCategory = (attributes: any) => {
  return async function put(id_pubc: string, publication_category: string) {
    const { data: category, error } = await attributes.updateCategory(
      id_pubc,
      publication_category
    )
    if (error) {
      throw error
    }

    return {
      status: 200,
      msg: 'Updated category successfully',
      data: category,
    }
  }
}

export default updateCategory
