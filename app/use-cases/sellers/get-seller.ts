const getSellerJwt = (sellerDb: any) => {
  return async function get(id_user: string) {
    const { data: res, error: err } = await sellerDb.getSeller(id_user)
    if (res) {
      const msg = `Seller has been found.`
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

export default getSellerJwt
