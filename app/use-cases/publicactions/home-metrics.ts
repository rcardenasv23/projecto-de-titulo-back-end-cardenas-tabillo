const homeInfo = (publicationDB: any) => {
  return async function get() {
    const { data: res, error: err } = await publicationDB.getHomeInfo()
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

export default homeInfo
