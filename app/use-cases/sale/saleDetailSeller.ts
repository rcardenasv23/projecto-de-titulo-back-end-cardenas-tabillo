const saleDetailSeller = (saleDB: any) => {
  return async function get(id_sale: string) {
    const { data: res, error: err } = await saleDB.getSaleDetailSeller(id_sale)
    if (res) {
      const msg = `Sale has been gotten successfully.`
      return { status: 200, msg: msg, data: res }
    } else {
      throw err
    }
  }
}

export default saleDetailSeller
