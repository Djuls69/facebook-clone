import { REGISTER_USER, LOGIN_USER, LOAD_USER } from '../types'

const init_state = {
  token: localStorage.getItem('facebook-token'),
  user: null
}

const userReducer = (state = init_state, action) => {
  const { type, payload } = action

  switch (type) {
    case REGISTER_USER:
    case LOGIN_USER:
      localStorage.setItem('facebook-token', payload)
      return {
        ...state,
        token: payload
      }
    case LOAD_USER:
      return {
        ...state,
        user: payload
      }
    default:
      return state
  }
}

export default userReducer
