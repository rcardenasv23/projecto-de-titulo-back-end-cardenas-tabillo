const deleteUserFile = (userFilesDb: any) => {
  return async function put(info: any) {
    if (!info.id_file) {
      throw new Error('Id invalida.')
    }
    const { data: res, error: err } = await userFilesDb.dese(info.id_file)

    if (res) {
      const msg = `User has been updated successfully.`
      return { status: 200, msg: msg, data: res }
    } else {
      throw new Error(err)
    }
  }
}

export default deleteUserFile
