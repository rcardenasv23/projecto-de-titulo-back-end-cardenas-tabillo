const patchSeller = () => {
  return function update(info: Object) {
    const {
      id_seller,
      email,
      store_name,
      rut,
      phone,
      bank_name,
      bank_account_name,
      bank_account_type,
      bank_account_address,
      bank_account_email,
      bank_account_rut,
    } = Object.values(info)[0].seller
    if (!id_seller) {
      throw new Error('Please enter user id.')
    }
    if (!email) {
      throw new Error('Please enter seller email.')
    }
    if (!store_name) {
      throw new Error('Please enter store name.')
    }
    if (!rut) {
      throw new Error('Please enter rut.')
    }
    if (!phone) {
      throw new Error('Please enter phone.')
    }
    if (!bank_name) {
      throw new Error('Please enter bank_name.')
    }
    if (!bank_account_name) {
      throw new Error('Please enter bank_account_name.')
    }
    if (!bank_account_type) {
      throw new Error('Please enter bank_account_type.')
    }
    if (!bank_account_address) {
      throw new Error('Please enter bank_account_address.')
    }
    if (!bank_account_email) {
      throw new Error('Please enter bank_account_email.')
    }
    if (!bank_account_rut) {
      throw new Error('Please enter bank_account_rut.')
    }

    return Object.freeze({
      getID: () => id_seller,
      getSellerEmail: () => email,
      getStoreName: () => store_name,
      getRut: () => rut,
      getPhone: () => phone,
      getBankName: () => bank_name,
      getBankAccountName: () => bank_account_name,
      getBankAccountType: () => bank_account_type,
      getBankAccountAddress: () => bank_account_address,
      getBankAccountEmail: () => bank_account_email,
      getBankAccountRut: () => bank_account_rut,
    })
  }
}

export default patchSeller
