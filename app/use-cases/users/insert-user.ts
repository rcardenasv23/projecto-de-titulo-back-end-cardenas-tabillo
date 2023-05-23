const insert = (makeUsers: Function, userDb: any) => {
  return async function post(info: Object) {
    let data = await makeUsers(info)

    data = {
      user_name: data.getUserName(),
      email: data.getEmail(),
      first_name: data.getFirstName(),
      last_name: data.getLastName(),
      created_at: data.getCreatedAt(),
      address: data.getAddress(),
      files: data.getFiles(),
      user_password: await data.getPassword(),
      seller: false,
      phone: data.getPhone(),
    }

    const { data: res, error: err } = await userDb.createUser(data)

    if (res) {
      const msg = `User has been added successfully.`
      return { status: 200, msg: msg, data: res }
    } else {
      throw err
    }
  }
}

export default insert
