const makeAddress = () => {
  return function update(info: {
    lat: string
    lng: string
    commune: string
    region: string
    address: string
    description: string
  }) {
    const { lat, lng, commune, region, address, description } = info

    if (!lat) {
      throw new Error('Error while parsing address.')
    }
    if (!lng) {
      throw new Error('Error while parsing address.')
    }
    if (!commune) {
      throw new Error('Error while parsing address 1.')
    }
    if (!region) {
      throw new Error('Error while parsing address 2.')
    }
    if (!address) {
      throw new Error('Error while parsing address.')
    }

    return Object.freeze({
      getLat: () => lat,
      getLng: () => lng,
      getAddress: () => address,
      getIdCommune: () => commune,
      getIdRegion: () => region,
      getDescription: () => description,
    })
  }
}

export default makeAddress
