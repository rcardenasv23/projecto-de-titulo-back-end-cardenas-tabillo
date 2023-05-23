const getPublicationById = (publicationDB: any) => {
  return async function get(id_fixed: string) {
    const { data: res, error: err } = await publicationDB.getPublication(
      id_fixed
    )
    if (res) {
      const msg = `Publication has been found.`
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

export default getPublicationById
