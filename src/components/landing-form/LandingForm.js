import React from 'react'
import './landingForm.css'
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

const LandingForm = ({ setModal, loginUser, users: { error } }) => {
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
    <form onSubmit={handleSubmit} className='landing-form' noValidate>
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

      <button className='landing-form__button blue-btn' type='submit'>
        Connexion
      </button>
      {error && <p className='form-error'>Identifiants incorrects.</p>}
      <p className='landing-form__link'>Mot de passe oublié ?</p>
      <div className='divider' />
      <button type='button' onClick={() => setModal(true)} className='landing-form__button green-btn'>
        Créer un compte
      </button>
    </form>
  )
}

const mapState = ({ users }) => ({ users })

export default connect(mapState, { loginUser })(LandingForm)
