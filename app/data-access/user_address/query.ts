import countryDataDb from '../country_data/app'
const queryUserAddress = (conn: any, models: any) => {
  return Object.freeze({
    insertAddress,
    updateAddress,
    getAddress,
  })

  async function insertAddress(address: any) {
    try {
      const Address = models.user_address
      const insertedAddress = await Address.create(address)
      if (!insertedAddress.id_address) {
        throw new Error('Error while adding address.')
      }
      return { data: insertedAddress, error: null }
    } catch (e: any) {
      console.log(e)
      return { data: null, error: e }
    }
  }
  async function updateAddress(address: any) {
    try {
      const Address = models.user_address
      const { id_user, ...rest } = address
      const [affected, addressExists] = await Address.update(
        { ...rest },
        {
          where: { id_user: id_user },
          returning: true,
          raw: true,
        }
      )
      if (affected !== 1) {
        throw new Error('Error while updating address.')
      }
      return { data: addressExists[0], error: null }
    } catch (e: any) {
      console.log(e)
      return { data: null, error: e }
    }
  }

  async function getAddress(credentials: any) {
    try {
      const Address = models.user_address
      let address = await Address.findOne({
        attributes: [
          'id_address',
          'id_region',
          'id_commune',
          'address',
          'lat',
          'lng',
          'description',
        ],
        where: { id_user: credentials.id_user },
        raw: true,
      })
      if (!address.id_address) {
        throw new Error('Error while getting address.')
      }
      const { data: communeData, error: communeError } =
        await countryDataDb.getCommune(address.id_commune)
      if (communeError) {
        throw new Error('Error while getting commune.')
      }
      address.commune = communeData
      const { data: regionData, error: regionError } =
        await countryDataDb.getRegion(address.id_region)
      if (regionError) {
        throw new Error('Error while getting region.')
      }
      address.region = regionData
      delete address.id_region
      delete address.id_commune
      return { data: address, error: null }
    } catch (e: any) {
      return { data: null, error: e }
    }
  }
}

export default queryUserAddress
