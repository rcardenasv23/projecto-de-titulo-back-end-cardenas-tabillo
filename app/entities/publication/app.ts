import makePublication from './makePublication'
import makeAddress from './makeAddress'
import makeFiles from './makeFiles'
import patchPublication from './patchPublication'
import patchAddress from './patchAddress'

const createAddress = makeAddress()
const createFiles = makeFiles()
const createPublication = makePublication(createAddress, createFiles)
const updatePublicationInfo = patchPublication()
const updatePublicationAddress = patchAddress()

const entity = {
  createPublication,
  createAddress,
  createFiles,
  updatePublicationInfo,
  updatePublicationAddress,
}
export default entity
