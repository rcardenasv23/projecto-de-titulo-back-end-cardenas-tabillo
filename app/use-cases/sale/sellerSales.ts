const getSellerSales = (saleDB: any) => {
  return async function get(id_seller: string) {
    const { data: res, error: err } = await saleDB.getSalesBySeller(id_seller)
    if (res) {
      const msg = `Sale has been gotten successfully.`
      return { status: 200, msg: msg, data: res }
    } else {
      throw err
    }
  }
}

export default getSellerSales
