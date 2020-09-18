import React from 'react'
import './registerForm.css'
import { useFormik } from 'formik'
import { registerUser } from '../../redux/actions/userActions'
import { connect } from 'react-redux'

const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Prénom et Nom requis'
  }

  if (!values.lastName) {
    errors.firstName = 'Prénom et Nom requis'
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

const RegisterForm = ({ setModal, registerUser, users: { error } }) => {
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
    }
  })
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } = formik

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
            onBlur={handleBlur}
            placeholder='Prénom'
          />
          <input
            className='register-form__input'
            type='email'
            name='lastName'
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='Nom de famille'
          />
        </div>
        {touched.firstName && errors.firstName && <p className='form-error'>{errors.firstName}</p>}
        <input
          className='register-form__input'
          type='email'
          name='email'
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Adresse e-mail'
        />
        {touched.email && errors.email && <p className='form-error'>{errors.email}</p>}
        <input
          className='register-form__input'
          type='password'
          name='password'
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Nouveau mot de passe'
        />
        {touched.password && errors.password && <p className='form-error'>{errors.password}</p>}
        {error && <p className='form-error'>Adresse e-mail déjà utilisée</p>}
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

const mapState = ({ users }) => ({ users })

export default connect(mapState, { registerUser })(RegisterForm)
