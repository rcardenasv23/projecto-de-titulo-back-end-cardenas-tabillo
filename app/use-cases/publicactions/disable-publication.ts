const disablePublication = (publicationDB: any) => {
  return async function get(id_fixed: string) {
    const { data: res, error: err } = await publicationDB.closePublication(
      id_fixed
    )
    if (res) {
      const msg = `Publication has been enabled.`
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

export default disablePublication
