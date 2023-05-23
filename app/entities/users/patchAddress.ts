const patchAddress = () => {
  return function update(info: Object) {
    const { lat, lng, commune, region, address, description } =
      Object.values(info)[0].address
    const id_user = Object.values(info)[0].id_user

    if (!id_user) {
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
      getID: () => id_user,
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
