const saveUserFile = (makeFile: Function, saleDB: any) => {
  return async function post(file: Object, id_sale: string) {
    let data = await makeFile(file)

    data = {
      file: data.getFile(),
      id_sale: id_sale,
    }

    const { data: res, error: err } = await saleDB.uploadFile(data)

    if (res) {
      const msg = `File has been added successfully.`
      return { status: 200, msg: msg, data: res }
    } else {
      throw err
    }
  }
}

export default saveUserFile
