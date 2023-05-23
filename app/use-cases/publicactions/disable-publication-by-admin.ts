const disablePublicationByAdmin = (publicationDB: any) => {
  return async function post(id_fixed: string) {
    const { data: res, error: err } =
      await publicationDB.closePublicationByAdmin(id_fixed)
    if (res) {
      const msg = `Publication has been disabled.`
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

export default disablePublicationByAdmin
