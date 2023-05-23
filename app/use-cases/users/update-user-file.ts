const updateUserFile = (makeFile: Function, userFilesDb: any) => {
  return async function put(info: Object) {
    let data = await makeFile(info)

    data = {
      id_file: null,
      file: null,
    }

    const { data: res, error: err } = await userFilesDb.updateFile(data)

    if (res) {
      const msg = `User has been updated successfully.`
      return { status: 200, msg: msg, data: res }
    } else {
      throw new Error(err)
    }
  }
}

export default updateUserFile
