const makeAddress = () => {
  return function update(info: Object) {
    const { lat, lng, commune, region, address, description } =
      Object.values(info)[0].address
    const email = Object.values(info)[0].email

    if (!email) {
      throw new Error('Error while parsing address.')
    }
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
      getEmail: () => email,
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
