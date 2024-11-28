import { codeService } from '../../services/code/code.service'
import { store } from '../store'
import { SET_CODES, SET_CODE } from '../reducers/code.reducer'

export async function loadCodes() {
  try {
    const codes = await codeService.query()

    store.dispatch({
      type: SET_CODES,
      codes,
    })

    return codes
  } catch (err) {
    console.log('Cannot get codes', err)
    throw err
  }
}

export async function getCodeById(codeId) {
  try {
    const code = await codeService.getById(codeId)
    store.dispatch({ type: SET_CODE, code })
    return code
  } catch (err) {
    console.log('Cannot get code', err)
    throw err
  }
}
