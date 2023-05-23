const completeSale = (saleDB: any) => {
  return async function post(
    id_sale: string,
    datePickUp: string,
    description: string
  ) {
    const { data: res, error: err } = await saleDB.acceptSale(
      id_sale,
      datePickUp,
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

export default completeSale
