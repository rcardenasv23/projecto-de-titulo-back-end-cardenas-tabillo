const getPublicationsForAdmin = (publicationDB: any) => {
  return async function get(filters: any) {
    const { data: res, error: err } =
      await publicationDB.getAllPublicationsForAdmin(filters)
    if (res) {
      const msg = `Publications has been found.`
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

export default getPublicationsForAdmin
