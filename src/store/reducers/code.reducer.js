export const SET_CODES = 'SET_CODES'
export const SET_CODE = 'SET_CODE'

const initialState = {
  codes: [],
  code: null,
}

export function codeReducer(state = initialState, action) {
  let newstate = state

  switch (action.type) {
    case SET_CODES:
      newstate = { ...state, codes: action.codes }

      break
    case SET_CODE:
      newstate = { ...state, code: action.code }
      break
    default:
  }
  return newstate
}
