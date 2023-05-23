const createUnity = (attributes: any) => {
  return async function post(publication_unity: string) {
    const { data: res, error: err } = await attributes.createUnity(
      publication_unity
    )
    if (res) {
      const msg = `Unity has been created.`
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

export default createUnity
