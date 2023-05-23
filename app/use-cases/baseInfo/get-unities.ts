const unities = (attributes: any) => {
  return async function get() {
    const { data: unities, error: errUnities } = await attributes.getUnities()
    if (errUnities) {
      throw errUnities
    }

    return {
      status: 200,
      msg: 'Country information got',
      data: unities,
    }
  }
}

export default unities
