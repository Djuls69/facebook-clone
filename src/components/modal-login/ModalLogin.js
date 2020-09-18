import React from 'react'
import './modalLogin.css'
import { useFormik } from 'formik'
import { loginUser } from '../../redux/actions/userActions'
import { connect } from 'react-redux'

const validate = values => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Adresse e-mail requise'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Adresse e-mail invalide'
  }

  if (!values.password) {
    errors.password = 'Mot de passe requis'
  } else if (values.password.length < 6) {
    errors.password = '6 caractères minimum'
  }

  return errors
}

const ModalLogin = ({ setModalLogin, loginUser, users: { error } }) => {
  const formik = useFormik({
    initialValues: {
      email: 'admin@gmail.com',
      password: 'admin1234'
    },
    validate,
    onSubmit: values => {
      loginUser(values.email, values.password)
    }
  })
  const { values, handleChange, handleSubmit } = formik

  return (
    <div className='modal-login'>
      <form onSubmit={handleSubmit} className='landing-form' noValidate>
        <div onClick={() => setModalLogin(false)} className='register-form__close'>
          <i className='fas fa-times'></i>
        </div>
        <h1>Se connecter à Facebook</h1>
        <div className='divider'></div>
        <input
          className='landing-form__input'
          type='email'
          name='email'
          value={values.email}
          onChange={handleChange}
          placeholder='Adresse e-mail'
        />
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

const mapState = ({ users }) => ({ users })

export default connect(mapState, { loginUser })(ModalLogin)
