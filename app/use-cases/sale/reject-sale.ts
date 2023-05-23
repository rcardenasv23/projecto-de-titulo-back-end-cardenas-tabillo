const rejectSale = (saleDB: any) => {
  return async function post(id_sale: string, description: string) {
    const { data: res, error: err } = await saleDB.rejectSale(
      id_sale,
      description
    )

    if (res) {
      const msg = `File has been added successfully.`
      return { status: 200, msg: msg, data: res }
    } else {
      throw err
    }
  }
}

export default rejectSale
