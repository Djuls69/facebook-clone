import { LOAD_USER, CLEAR_USER, ERROR_USER, CLEAR_ERROR } from '../types'

const init_state = {
  user: JSON.parse(localStorage.getItem('facebook-user')),
  error: null
}

const userReducer = (state = init_state, action) => {
  const { type, payload } = action

  switch (type) {
    case LOAD_USER:
      localStorage.setItem('facebook-user', JSON.stringify(payload))
      return {
        ...state,
        user: JSON.parse(localStorage.getItem('facebook-user'))
      }
    case CLEAR_USER:
      localStorage.removeItem('facebook-user')
      return {
        ...state,
        user: null
      }
    case ERROR_USER:
      return {
        ...state,
        error: payload
      }
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}

export default userReducer
