const getUserSales = (saleDB: any) => {
  return async function get(id_user: string) {
    const { data: res, error: err } = await saleDB.getSalesByUser(id_user)
    if (res) {
      const msg = `Sale has been gotten successfully.`
      return { status: 200, msg: msg, data: res }
    } else {
      throw err
    }
  }
}

export default getUserSales
