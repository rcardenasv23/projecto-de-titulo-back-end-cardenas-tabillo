const queryFixedFiles = (conn: any, models: any) => {
  return Object.freeze({
    deleteFile,
    addFiles,
  })

  async function deleteFile(file: string) {
    try {
      const Files = models.publication_file
      const deletedFiles = await Files.destroy({ where: { id_file: file } })
      return { data: deletedFiles, error: null }
    } catch (e) {
      console.log(e)
      return { data: null, error: e }
    }
  }
  async function addFiles(files: any, credentials: any) {
    try {
      const Files = models.publication_file
      for (let index in files) {
        files[index].extension =
          files[index].extension && files[index].extension.length > 0
            ? files[index].extension
            : null
        files[index] = { ...files[index], ...credentials }
      }
      const insertedFiles: any = await Files.bulkCreate(files)
      if (insertedFiles.Error) {
        throw insertedFiles.Error
      }
      return { data: insertedFiles, error: null }
    } catch (e) {
      console.log(e)
      return { data: null, error: e }
    }
  }
}

export default queryFixedFiles
