import React from 'react'
import './registerForm.css'
import { useFormik } from 'formik'
import { registerUser } from '../../redux/actions/userActions'
import { connect } from 'react-redux'

const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Prénom requis'
  }

  if (!values.lastName) {
    errors.lastName = 'Nom requis'
  }

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

const RegisterForm = ({ setModal, registerUser }) => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    validate,
    onSubmit: values => {
      registerUser(values.firstName, values.lastName, values.email, values.password)
      setModal(false)
    }
  })
  const { values, handleChange, handleSubmit } = formik

  return (
    <div className='register-form'>
      <form className='register-form__form' noValidate onSubmit={handleSubmit}>
        <div onClick={() => setModal(false)} className='register-form__close'>
          <i className='fas fa-times'></i>
        </div>
        <div className='register-form__header'>
          <h1>S'inscrire</h1>
          <p>C'est rapide et facile.</p>
        </div>
        <div className='divider' />
        <div className='names__inputs'>
          <input
            className='register-form__input'
            type='text'
            name='firstName'
            value={values.firstName}
            onChange={handleChange}
            placeholder='Prénom'
          />
          <input
            className='register-form__input'
            type='email'
            name='lastName'
            value={values.lastName}
            onChange={handleChange}
            placeholder='Nom de famille'
          />
        </div>
        <input
          className='register-form__input'
          type='email'
          name='email'
          value={values.email}
          onChange={handleChange}
          placeholder='Adresse e-mail ou numéro de tél.'
        />
        <input
          className='register-form__input'
          type='password'
          name='password'
          value={values.password}
          onChange={handleChange}
          placeholder='Nouveau mot de passe'
        />
        <p className='register-form__small'>
          En cliquant sur S’inscrire, vous acceptez nos Conditions générales. Découvrez comment nous recueillons,
          utilisons et partageons vos données en lisant notre Politique d’utilisation des données et comment nous
          utilisons les cookies et autres technologies similaires en consultant notre Politique d’utilisation des
          cookies. Vous recevrez peut-être des notifications par texto de notre part et vous pouvez à tout moment vous
          désabonner.
        </p>
        <button className='register-form__button green-btn' type='submit'>
          S'inscrire
        </button>
      </form>
    </div>
  )
}

export default connect(null, { registerUser })(RegisterForm)
