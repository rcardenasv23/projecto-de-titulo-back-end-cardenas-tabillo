const reActivate = (publicationDB: any) => {
  return async function post(id_fixed: string) {
    const { data: res, error: err } = await publicationDB.reActivate(id_fixed)
    if (res) {
      const msg = `Publication has been reactivated.`
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

export default reActivate
