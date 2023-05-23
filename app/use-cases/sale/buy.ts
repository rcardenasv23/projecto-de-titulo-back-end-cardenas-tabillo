const buy = (makeSale: Function, saleDB: any) => {
  return async function post(info: Object) {
    let data = await makeSale(info)

    data = {
      sellers: data.getSellerInfo(),
      user: data.getUserInfo(),
    }

    const { data: res, error: err } = await saleDB.createSale(data)
    console.log('respuesta final', res)
    if (res) {
      const msg = `Sale has been added successfully.`
      return { status: 200, msg: msg, data: res }
    } else {
      throw err
    }
  }
}

export default buy
