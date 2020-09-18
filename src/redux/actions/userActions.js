import { auth, db } from '../../firebase/firebase'
import { REGISTER_USER, LOGIN_USER, CLEAR_USER } from '../types'

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

    dispatch({
      type: REGISTER_USER
    })
  } catch (err) {
    console.log(err.message)
  }
}

export const loginUser = (email, password) => async dispatch => {
  try {
    await auth.signInWithEmailAndPassword(email, password)
    const userId = auth.currentUser.uid
    const res = await db.doc(`users/${userId}`).get()
    dispatch({
      type: LOGIN_USER,
      payload: res.data()
    })
  } catch (err) {
    console.log(err.message)
  }
}

export const signOut = () => async dispatch => {
  try {
    await auth.signOut()
    dispatch({
      type: CLEAR_USER
    })
  } catch (err) {
    console.log(err.message)
  }
}

export const tokenExpires = () => dispatch => {
  try {
    dispatch({
      type: CLEAR_USER
    })
  } catch (err) {
    console.log(err.message)
  }
}
