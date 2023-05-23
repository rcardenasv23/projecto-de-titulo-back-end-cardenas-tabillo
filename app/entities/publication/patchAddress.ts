const patchAddress = () => {
  return function update(info: {
    lat: string
    lng: string
    commune: string
    region: string
    address: string
    description: string
    id_address: string
  }) {
    const { lat, lng, commune, region, address, description, id_address } = info

    if (!lat) {
      throw new Error('Error while parsing address.')
    }
    if (!lng) {
      throw new Error('Error while parsing address.')
    }
    if (!commune) {
      throw new Error('Error while parsing address.')
    }
    if (!region) {
      throw new Error('Error while parsing address.')
    }
    if (!address) {
      throw new Error('Error while parsing address.')
    }
    if (!id_address) {
      throw new Error('Error while parsing address.')
    }

    return Object.freeze({
      getId: () => id_address,
      getLat: () => lat,
      getLng: () => lng,
      getAddress: () => address,
      getIdCommune: () => commune,
      getIdRegion: () => region,
      getDescription: () => description,
    })
  }
}

export default patchAddress
