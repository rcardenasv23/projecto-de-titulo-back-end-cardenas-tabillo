const patch = (sellerDb: any, patchSeller: Function) => {
  return async function put(info: Object) {
    let data = patchSeller(info)

    data = {
      id_seller: data.getID(),
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
    }

    const { data: res, error: err } = await sellerDb.update(data)
    if (res) {
      const msg = `Seller has been updated.`
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

export default patch
