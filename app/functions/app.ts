import hashings from './hashings'
import { authCreate, authVerifyAdmin, authVerifySeller } from './auth'
import { authVerify } from './auth'
export const encrypt = hashings()
export const auth = {
  authCreate,
  authVerify,
  authVerifySeller,
  authVerifyAdmin,
}
