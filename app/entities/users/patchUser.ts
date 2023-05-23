const patchUser = () => {
  return function patch(info: Object) {
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
      throw new Error('Error while parsing address 1.')
    }
    if (!address.lng) {
      throw new Error('Error while parsing address 2.')
    }
    if (!address.commune) {
      throw new Error('Error while parsing address 3.')
    }
    if (!address.region) {
      throw new Error('Error while parsing address 4.')
    }
    if (!address.address) {
      throw new Error('Error while parsing address 5.')
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
      getPassword: () => user_password,
      getCreatedAt: () => new Date(),
    })
  }
}

export default patchUser
