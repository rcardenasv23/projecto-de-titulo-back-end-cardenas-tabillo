const categories = (attributes: any) => {
  return async function get() {
    const { data: categories, error: errCategories } =
      await attributes.getCategories()
    if (errCategories) {
      throw errCategories
    }

    return {
      status: 200,
      msg: 'Country information got',
      data: categories,
    }
  }
}

export default categories
