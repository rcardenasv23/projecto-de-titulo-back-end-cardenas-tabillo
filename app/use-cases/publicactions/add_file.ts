const addPublicationFile = (makeFiles: Function, publicationFileDB: any) => {
  return async function post(files: Array<any>, credentials: any) {
    let data = makeFiles(files)

    const { data: res, error: err } = await publicationFileDB.addFiles(
      data.getFiles(),
      credentials
    )
    if (err) {
      throw err
    } else {
      const msg = `File has been added.`
      return {
        status: 200,
        msg: msg,
        data: res,
      }
    }
  }
}

export default addPublicationFile
