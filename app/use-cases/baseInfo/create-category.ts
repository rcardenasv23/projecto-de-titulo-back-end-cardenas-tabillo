const createCategory = (attributes: any) => {
  return async function post(publication_category: string) {
    const { data: res, error: err } = await attributes.createCategory(
      publication_category
    )
    if (res) {
      const msg = `Category has been created.`
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

export default createCategory
