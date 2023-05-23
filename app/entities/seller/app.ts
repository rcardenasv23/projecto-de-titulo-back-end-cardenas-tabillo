import makeSeller from './makeSeller'
import patchSeller from './patchSeller'

const createSeller = makeSeller()
const updateSeller = patchSeller()

const entity = {
  createSeller,
  updateSeller,
}
export default entity
