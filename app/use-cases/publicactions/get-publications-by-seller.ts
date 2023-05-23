const getPublicationsBySeller = (publicationDB: any) => {
  return async function get(id_seller: string) {
    const { data: res, error: err } = await publicationDB.getSellerPublications(
      id_seller
    )
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

export default getPublicationsBySeller
