import { ADD_ACCOUNT, REMOVE_ACCOUNT } from '../types'

const init_state = []

const accountsReducer = (state = init_state, action) => {
  const { type, payload } = action

  switch (type) {
    case ADD_ACCOUNT:
      return [payload, ...state]
    case REMOVE_ACCOUNT:
      return state.filter(acc => acc.email !== payload)
    default:
      return state
  }
}

export default accountsReducer
