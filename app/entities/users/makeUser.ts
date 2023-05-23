const makeUser = (encrypt: Function) => {
  return function make(info: Object) {
    const {
      email,
      user_name,
      first_name,
      last_name,
      address,
      files,
      phone,
      user_password,
    } = Object.values(info)[0]
    if (!email) {
      throw new Error('Please enter first Email.')
    }
    if (!first_name) {
      throw new Error('Please enter FirstName.')
    }
    if (!last_name) {
      throw new Error('Please enter LastName.')
    }
    if (!address.lat) {
      throw new Error('Error while parsing address.')
    }
    if (!address.lng) {
      throw new Error('Error while parsing address.')
    }
    if (!address.commune) {
      throw new Error('Error while parsing address.')
    } else {
      address.id_commune = address.commune
      delete address.commune
    }
    if (!address.region) {
      throw new Error('Error while parsing address.')
    } else {
      address.id_region = address.region
      delete address.region
    }
    if (!address.address) {
      throw new Error('Error while parsing address.')
    }
    if (!phone) {
      throw new Error('Please enter Phone.')
    }
    if (!user_password) {
      throw new Error('Please enter Password.')
    }
    return Object.freeze({
      getFirstName: () => first_name,
      getLastName: () => last_name,
      getUserName: () => user_name,
      getEmail: () => email,
      getAddress: () => address,
      getFiles: () => files,
      getPhone: () => phone,
      getPassword: async () => await encrypt(user_password),
      getCreatedAt: () => new Date(),
    })
  }
}

export default makeUser
