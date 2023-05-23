const updatePublicationAddress = (
  patchAddress: Function,
  publicationAddressDB: any
) => {
  return async function put(values: any) {
    let data = patchAddress(values)

    data = {
      id_address: data.getId(),
      lat: data.getLat(),
      lng: data.getLng(),
      address: data.getAddress(),
      commune: data.getIdCommune(),
      region: data.getIdRegion(),
      description: data.getDescription(),
    }

    const { data: res, error: err } = await publicationAddressDB.updateAddress(
      data
    )

    if (res) {
      const msg = `Publication has been found.`
      return {
        status: 200,
        msg: msg,
        data: res,
      }
    } else {
      throw err
    }
  }
}

export default updatePublicationAddress
