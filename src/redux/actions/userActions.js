import { auth, db } from '../../firebase/firebase'
import jwt from 'jsonwebtoken'
import { REGISTER_USER, LOGIN_USER, LOAD_USER } from '../types'

export const registerUser = (firstName, lastName, email, password) => async dispatch => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password)
    await db.collection('users').doc(res.user.uid).set({
      firstName,
      lastName,
      email,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/facebook-clone-9617c.appspot.com/o/default-avatar.jpg?alt=media&token=0130fabe-a830-44f4-b334-524a49552555',
      date: Date.now()
    })

    const payload = {
      user: {
        id: res.user.uid
      }
    }

    const token = jwt.sign(payload, process.env.REACT_APP_TOKENSECRET, { expiresIn: 60 * 60 * 24 })
    dispatch({
      type: REGISTER_USER,
      payload: token
    })
    dispatch(loadUser(token))
  } catch (err) {
    console.log(err.message)
  }
}

export const loginUser = (email, password) => async dispatch => {
  try {
    const res = await auth.signInWithEmailAndPassword(email, password)

    const payload = {
      user: {
        id: res.user.uid
      }
    }

    const token = jwt.sign(payload, process.env.REACT_APP_TOKENSECRET, { expiresIn: 60 * 60 * 24 })
    dispatch({
      type: LOGIN_USER,
      payload: token
    })
    dispatch(loadUser(token))
  } catch (err) {
    console.log(err.message)
  }
}

export const loadUser = token => async dispatch => {
  try {
    const decoded = jwt.verify(token, process.env.REACT_APP_TOKENSECRET)
    console.log(decoded.user.id)
    const user = await db.doc(`users/${decoded.user.id}`).get()
    if (user) {
      console.log(user.data())
      dispatch({
        type: LOAD_USER,
        payload: user.data()
      })
    }
  } catch (err) {
    console.log(err.message)
  }
}
