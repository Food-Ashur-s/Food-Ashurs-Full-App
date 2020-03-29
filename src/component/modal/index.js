/* eslint-disable no-unused-vars */
import React from 'react';
import logo from '../../assets/logo-popup-.png';
import styles from './modal.module.scss';

const Modal = props => {
  return (
    <div className={styles.modal}>
      <div className="modal-popUp">
        <header className="popUp-title">
          <img src={logo}  className="logo-popup" height="95px" width="58px"/>
          <span className="title">{props.title}</span>
          <button onClick={props.close} className="close-button">X</button>
        </header>
        <div className="popUp-info">{props.children}</div>
      </div>
    </div>
  );
};
export default Modal;
