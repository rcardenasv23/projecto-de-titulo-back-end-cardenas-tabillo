const optionsTemplate = {
  to: '',
  subject: '',
  html: '',
  textEncoding: 'base64',
  headers: [
    { key: 'X-Application-Developer', value: 'Rodrigo Cárdenas' },
    { key: 'X-Application-Version', value: 'v1.0.0.2' },
  ],
}

const entity = {
  optionsTemplate,
}
export default entity
