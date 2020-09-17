import React, { useState } from 'react'
import './landing.css'
import facebookLogo from '../../assets/facebook-logo.svg'
import LandingCard from '../../components/landing-card/LandingCard'
import LandingForm from '../../components/landing-form/LandingForm'
import RegisterForm from '../../components/register-form/RegisterForm'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'

const Landing = ({ users: { user } }) => {
  const [modal, setModal] = useState(false)

  return (
    <section className='landing'>
      <div className='landing__container'>
        <div className='landing__left'>
          <img className='landing__img' src={facebookLogo} alt='Logo' />
          <div className='landing__text'>
            <h1>Connexions récentes</h1>
            <p>Cliquez sur votre image ou sur Ajouter un compte.</p>
          </div>
          <div className='cards_container'>
            {user !== null && <LandingCard name={user.firstName} avatar={user.avatar} />}
            <div className='card'>
              <i className='fas fa-plus-circle card__img'></i>
              <div className='card__name'>
                <h2 style={{ color: 'var(--facebook-blue)' }}>Ajouter un compte</h2>
              </div>
            </div>
          </div>
        </div>
        <div className='landing__right'>
          <LandingForm setModal={setModal} />
          <p>
            <span className='landing__right--link'>Créer une Page</span> pour une célébrité, un groupe ou une
            entreprise.
          </p>
        </div>
      </div>
      <CSSTransition in={modal} timeout={400} classNames='my-node' mountOnEnter unmountOnExit>
        <RegisterForm setModal={setModal} />
      </CSSTransition>
    </section>
  )
}

const mapState = state => ({
  users: state.users
})

export default connect(mapState)(Landing)
