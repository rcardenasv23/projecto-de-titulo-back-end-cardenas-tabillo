const updatePassword = (encrypt: Function) => {
  return function update(info: Object) {
    const { id_user, current_password, new_password } = Object.values(info)[0]

    if (!current_password) {
      throw new Error('Please enter current password.')
    }
    if (!new_password) {
      throw new Error('Please enter new password.')
    }
    return Object.freeze({
      getID: () => id_user,
      getCurrentPassword: () => current_password,
      getNewPassword: async () => await encrypt(new_password),
    })
  }
}

export default updatePassword
