const contentStates = (attributes: any) => {
  return async function get() {
    const { data: contentStates, error: errContentStates } =
      await attributes.getContentStates()
    if (errContentStates) {
      throw errContentStates
    }

    return {
      status: 200,
      msg: 'Country information got',
      data: contentStates,
    }
  }
}

export default contentStates
