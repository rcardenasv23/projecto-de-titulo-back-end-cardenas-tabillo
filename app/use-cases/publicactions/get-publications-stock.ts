const getPublicationsStock = (publicationDB: any) => {
  return async function post(ids: Array<string>) {
    const { data: res, error: err } = await publicationDB.getStocks(ids)
    if (res) {
      const msg = `Publications stock have been found.`
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

export default getPublicationsStock
