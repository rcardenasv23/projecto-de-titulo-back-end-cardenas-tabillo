const getAllAtributes = (attributes: any) => {
  return async function get() {
    const { data: categories, error: errCategories } =
      await attributes.getCategories()
    if (errCategories) {
      throw errCategories
    }
    const { data: unitites, error: errUnitites } = await attributes.getUnities()
    if (errUnitites) {
      throw errUnitites
    }

    const { data: states, error: errStates } =
      await attributes.getProductStates()
    if (errStates) {
      throw errStates
    }

    return {
      status: 200,
      msg: 'Attributes got',
      data: { Categories: categories, Unities: unitites, States: states },
    }
  }
}

export default getAllAtributes
