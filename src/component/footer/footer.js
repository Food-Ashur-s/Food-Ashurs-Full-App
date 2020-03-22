import React from 'react';
import './footer.scss';

class Footer extends React.Component{
  render(){
    return(
      <>
        <footer className="page-footer">
          <div className="simple-bio">
            <h5 class="footer-header">Food Ashur's</h5>
            <p>Application that takes extra food from local restaurants and gives it to people or charities of need. This helps save wasted food and assists in the wellness of the local community</p>
          </div>
          <div className="links-div">
            <h5 class="linkes-header">More Links</h5>

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
            <p>
              <i className="fas fa-home mr-3"></i> Amman Jordan</p>
            <p>
              <i className="fas fa-envelope mr-3"></i> foodAshurs@gmail.com</p>
            <p>
              <i className="fas fa-phone mr-3"></i> + 962 234 567 88</p>
            <p>
              <i className="fas fa-print mr-3"></i> + 962 234 567 89</p>
          </div>

          <div className="social-icon">
            <a href="#" class="fa fa-facebook"></a>
            <a href="#" class="fa fa-twitter"></a>
            <a href="#" class="fa fa-google"></a>
            <a href="#" class="fa fa-linkedin"></a>
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