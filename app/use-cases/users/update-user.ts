const update = (updateUser: Function, userDb: any) => {
  return async function put(info: Object) {
    let data = await updateUser(info)

    data = {
      user_name: data.getUserName(),
      email: data.getEmail(),
      first_name: data.getFirstName(),
      last_name: data.getLastName(),
      created_at: data.getCreatedAt(),
      address: data.getAddress(),
      files: data.getFiles(),
      user_password: data.getPassword(),
      phone: data.getPhone(),
    }

    const { data: res, error: err } = await userDb.updateUser(data)

    if (res) {
      const msg = `User has been updated successfully.`
      return { status: 200, msg: msg, data: res }
    } else {
      throw new Error(err)
    }
  }
}

export default update
