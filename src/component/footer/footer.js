import React from 'react';
import './footer.scss';

class Footer extends React.Component{
  render(){
    return(
      <>
        <div className="div-fix"></div>
        <footer className="page-footer">
          <div className="simple-bio">
            <h5 className="footer-header">Food Ashur's</h5>
            <p>Application that takes extra food from local restaurants and gives it to people or charities of need. This helps save wasted food and assists in the wellness of the local community</p>
          </div>
          <div className="links-div">
            <h5 className="linkes-header">More Links</h5>

            <ul class="linkes-list">
              <li>
                <a href="#!">more Details</a>
              </li>
              <li>
                <a href="#!">Location</a>
              </li>
              <li>
                <a href="#!">Company</a>
              </li>
              <li>
                <a href="#!">Owner</a>
              </li>
            </ul>
          </div>
          <div class="contact-div">
            <h6 className="contact-header">Contact</h6>
            <p className="contact-p">
              <i className="fa fa-map-marker"></i> Amman, Jordan</p>
            <p className="contact-p">
              <i className="fa fa-inbox"></i> foodAshurs@gmail.com</p>
            <p className="contact-p">
              <i className="	fa fa-mobile-phone" ></i> + 962 234 567 88</p>
            <p className="contact-p">
              <i className="	fa fa-mobile-phone"></i> + 962 234 567 89</p>
          </div>

          <div className="social-icon">
            <a href="#" className="fa fa-facebook"></a>
            <a href="#" className="fa fa-twitter"></a>
            <a href="#" className="fa fa-google"></a>
            <a href="#" className="fa fa-linkedin"></a>
            <a href="#" className="fa fa-instagram"></a>
          </div>
          <div class="footer-copyright">©2020 CopyRight:
            <a href="https://food--ashurs.herokuapp.com/"> Food Ashur's</a>
          </div>
        </footer>
      </>
    );
  }
}


export default Footer;