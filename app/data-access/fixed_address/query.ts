import countryDataDb from '../country_data/app'

const queryFixedAddress = (conn: any, models: any) => {
  return Object.freeze({
    getAddress,
    updateAddress,
  })

  async function getAddress(id_fixed: any) {
    try {
      const Address = models.publication_address
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
        where: { id_fixed: id_fixed },
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
  async function updateAddress(address: any) {
    try {
      const Address = models.publication_address
      const { id_address, ...rest } = address
      const [affected, addressExists] = await Address.update(
        { ...rest },
        {
          where: { id_address: id_address },
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
}

export default queryFixedAddress
