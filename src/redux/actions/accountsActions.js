import { ADD_ACCOUNT, REMOVE_ACCOUNT } from '../types'

export const addAccount = account => {
  return {
    type: ADD_ACCOUNT,
    payload: account
  }
}

export const removeAccount = email => ({
  type: REMOVE_ACCOUNT,
  payload: email
})
