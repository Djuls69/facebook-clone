import { REGISTER_USER, LOGIN_USER, CLEAR_USER } from '../types'

const init_state = {
  user: JSON.parse(localStorage.getItem('facebook-user'))
}

const userReducer = (state = init_state, action) => {
  const { type, payload } = action

  switch (type) {
    case REGISTER_USER:
      localStorage.setItem('facebook-token', payload)
      return {
        ...state,
        token: payload
      }
    case LOGIN_USER:
      localStorage.setItem('facebook-user', JSON.stringify(payload))
      return {
        ...state,
        user: payload
      }
    case CLEAR_USER:
      localStorage.removeItem('facebook-user')
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}

export default userReducer
