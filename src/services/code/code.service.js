import { httpService } from '../http.service'

export const codeService = {
  query,
  getById,
}
async function query() {
  const codes = httpService.get('code')
  console.log('Response from server:', codes)
  return codes
}

async function getById(codeId) {
  return httpService.get(`code/${codeId}`)
}
