const makeFile = () => {
  return function update(file: any) {
    if (!file.url) {
      throw new Error('Insert file url')
    }
    if (!file.name) {
      throw new Error('Insert file name')
    }
    return Object.freeze({
      getFile: () => file,
    })
  }
}

export default makeFile
