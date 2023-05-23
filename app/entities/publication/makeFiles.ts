const makeFiles = () => {
  return function update(files: Array<any>) {
    for (let file of files) {
      if (!file.url) {
        throw new Error('Insert url for every file')
      }
    }
    return Object.freeze({
      getFiles: () => files,
    })
  }
}

export default makeFiles
