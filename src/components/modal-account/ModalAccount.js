import React from 'react'
import './modalAccount.css'
import { useFormik } from 'formik'
import { loginUser } from '../../redux/actions/userActions'
import { connect } from 'react-redux'

const validate = values => {
  const errors = {}

  if (!values.password) {
    errors.password = 'Mot de passe requis'
  } else if (values.password.length < 6) {
    errors.password = '6 caractères minimum'
  }

  return errors
}

const ModalAccount = ({
  setModalAccount,
  loginUser,
  users: { error },
  account: { avatar, firstName, lastName, email }
}) => {
  const formik = useFormik({
    initialValues: {
      password: ''
    },
    validate,
    onSubmit: values => {
      loginUser(email, values.password)
    }
  })
  const { values, handleChange, handleSubmit } = formik

  return (
    <div className='modal-login'>
      <form onSubmit={handleSubmit} className='landing-form' style={{ paddingTop: '6rem' }} noValidate>
        <div onClick={() => setModalAccount(false)} className='register-form__close'>
          <i className='fas fa-times'></i>
        </div>
        <img src={avatar} className='modal-login__avatar' alt='Avatar' />
        <h4 className='modal-login__name'>{`${firstName} ${lastName}`}</h4>
        <input
          className='landing-form__input'
          type='password'
          name='password'
          value={values.password}
          onChange={handleChange}
          placeholder='Mot de passe'
        />
        {error && <p className='form-error'>Identifiants incorrects.</p>}
        <button className='landing-form__button blue-btn' type='submit'>
          Connexion
        </button>
        <p className='landing-form__link'>Mot de passe oublié ?</p>
      </form>
    </div>
  )
}

const mapState = state => ({
  users: state.users
})

export default connect(mapState, { loginUser })(ModalAccount)
