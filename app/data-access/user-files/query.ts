const queryFiles = (conn: any, models: any) => {
  return Object.freeze({
    insertFiles,
    updateFile,
  })

  async function insertFiles(files: any, credentials: any) {
    const transaction = await models.sequelize.transaction()
    try {
      const File = models.user_file
      for (let index in files) {
        files[index].extension =
          files[index].extension && files[index].extension.length > 0
            ? files[index].extension
            : null
        files[index] = { ...files[index], ...credentials }
      }
      const insertedFiles: any = File.bulkCreate(files)
      if (insertedFiles.Error) {
        throw insertedFiles.Error
      }
      await transaction.commit()

      return { data: insertedFiles, error: null }
    } catch (e: any) {
      await transaction.rollback()

      return { data: null, error: e }
    }
  }

  async function updateFile(id: any, file: any) {
    try {
      const File = models.user_file
      file.extension =
        file.extension && file.extension.length > 0 ? file.extension : null
      const insertedFiles: any = File.update(file, { where: { id_file: id } })
      if (insertedFiles.Error) {
        throw insertedFiles.Error
      }

      return { data: insertedFiles, error: null }
    } catch (e: any) {
      return { data: null, error: e }
    }
  }

  async function deleteFile(id: any) {
    try {
      const File = models.user_file
      const insertedFiles: any = File.destroy({ where: { id_file: id } })
      if (!insertedFiles.Errors || insertedFiles.Errors) {
        throw insertedFiles.Errors
          ? insertedFiles.Errors
          : new Error('Error while deleting file.')
      }
      return { data: insertedFiles, error: null }
    } catch (e: any) {
      return { data: null, error: e }
    }
  }
}
export default queryFiles
