const deletePublicationFile = (publicationFileDB: any) => {
  return async function get(id_file: string) {
    const { data: res, error: err } = await publicationFileDB.deleteFile(
      id_file
    )
    if (res) {
      const msg = `Publication has been found.`
      return {
        status: 200,
        msg: msg,
        data: res,
      }
    } else {
      throw err
    }
  }
}

export default deletePublicationFile
