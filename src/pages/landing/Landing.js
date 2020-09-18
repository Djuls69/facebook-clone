import React, { useState } from 'react'
import './landing.css'
import facebookLogo from '../../assets/facebook-logo.svg'
import LandingCard from '../../components/landing-card/LandingCard'
import LandingForm from '../../components/landing-form/LandingForm'
import RegisterForm from '../../components/register-form/RegisterForm'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import ModalLogin from '../../components/modal-login/ModalLogin'

const Landing = ({ users: { user }, accounts }) => {
  const [modal, setModal] = useState(false)
  const [modalLogin, setModalLogin] = useState(false)

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
            {accounts.length > 0 &&
              accounts
                .filter((_, idx) => idx < 2)
                .map(account => <LandingCard key={account.email} account={account} />)}
            <div className='card' onClick={() => setModalLogin(true)}>
              <i className='fas fa-plus-circle card__img'></i>
              <div className='card__name'>
                <h2 style={{ color: 'var(--facebook-blue)' }}>Ajouter un compte</h2>
              </div>
            </div>
          </div>
          <CSSTransition in={modalLogin} timeout={300} classNames='my-node' mountOnEnter unmountOnExit>
            <ModalLogin setModalLogin={setModalLogin} />
          </CSSTransition>
        </div>
        <div className='landing__right'>
          <LandingForm setModal={setModal} />
          <p>
            <span className='landing__right--link'>Créer une Page</span> pour une célébrité, un groupe ou une
            entreprise.
          </p>
        </div>
      </div>
      <CSSTransition in={modal} timeout={300} classNames='my-node' mountOnEnter unmountOnExit>
        <RegisterForm setModal={setModal} />
      </CSSTransition>
    </section>
  )
}

const mapState = state => ({
  users: state.users,
  accounts: state.accounts
})

export default connect(mapState)(Landing)
