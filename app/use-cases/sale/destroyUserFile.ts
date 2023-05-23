const destroyUserFile = (saleDB: any) => {
  return async function destroy(id_file: string) {
    console.log(id_file)
    const { data: res, error: err } = await saleDB.deleteFile(id_file)

    if (res) {
      const msg = `File has been deleted successfully.`
      return { status: 200, msg: msg, data: res }
    } else {
      throw err
    }
  }
}

export default destroyUserFile
