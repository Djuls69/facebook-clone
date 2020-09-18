import React, { Fragment, useState } from 'react'
import './landingCard.css'
import { removeAccount } from '../../redux/actions/accountsActions'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import ModalAccount from '../modal-account/ModalAccount'

const LandingCard = ({ account, removeAccount }) => {
  const { email, firstName, avatar } = account
  const [modalAccount, setModalAccount] = useState(false)
  return (
    <Fragment>
      <div onClick={() => setModalAccount(true)} className='card'>
        <div onClick={() => removeAccount(email)} className='card__img--delete'>
          <i className='fas fa-times-circle'></i>
        </div>
        <img className='card__img' src={avatar} alt='Profile' />
        <div className='card__name'>
          <h2>{firstName}</h2>
        </div>
      </div>
      <CSSTransition in={modalAccount} timeout={300} classNames='my-node' mountOnEnter unmountOnExit>
        <ModalAccount setModalAccount={setModalAccount} account={account} />
      </CSSTransition>
    </Fragment>
  )
}

export default connect(null, { removeAccount })(LandingCard)
