import React from 'react';
import logo from '../../assets/logo5.PNG';
import styles from './modal.module.scss';
// import '../../../../node_modules/font-awesome/css/font-awesome.min.css';

const Modal = props => {
  return (
    <div className={styles.modal}>
      <div className="modal-popUp">
        <header className="popUp-title">
          <img src={logo}  className="logo-popup" height="90px" width="200px"/>
          <span className="title">{props.title}</span>
          <button onClick={props.close} className="close-button">X</button>
        </header>
        <div className="popUp-info">{props.children}</div>
      </div>
    </div>
  );
};
export default Modal;
