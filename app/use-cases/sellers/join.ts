const join = (sellerDb: any, makeSeller: Function) => {
  return async function get(info: Object) {
    let data = makeSeller(info)

    data = {
      id_user: data.getID(),
      email: data.getSellerEmail(),
      phone: data.getPhone(),
      store_name: data.getStoreName(),
      rut: data.getRut(),
      bank_name: data.getBankName(),
      bank_account_name: data.getBankAccountName(),
      bank_account_type: data.getBankAccountType(),
      bank_account_address: data.getBankAccountAddress(),
      bank_account_email: data.getBankAccountEmail(),
      bank_account_rut: data.getBankAccountRut(),
      created_at: new Date(),
    }

    const { data: res, error: err } = await sellerDb.join(data)
    if (res) {
      const msg = `Seller has been created.`
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

export default join
