import React from 'react';
import ashar from '../../assets/ashar.jpg';
import ayman from '../../assets/ayman.jpg';
import nawal from '../../assets/nawal.jpg';
import qusay from '../../assets/qusay.jpg';
import './about.scss';




class About  extends React.Component {
  constructor(props){
    super(props);
    this.state= {show:'fixed'};
  }

  render() {
    return (
      <div className="team-section" id="team-section">
        <div className="hid"style={{display:this.state.show}}>
          <h2>Our Team</h2>
          <span className="border"></span>
          <div className="ps">
            <a href="#p1"><img src={ayman} onClick={()=> this.setState({show:'none'})} alt="" /></a>
            <a href="#p2"><img src={qusay}  onClick={()=> this.setState({show:'none'})} alt="" /></a>
            <a href="#p3"><img src={ashar}  onClick={()=> this.setState({show:'none'})} alt="" /></a>
            <a href="#p4"><img src={nawal}  onClick={()=> this.setState({show:'none'})} alt="" /></a>
          </div>
        </div>

        <div className="section" id="p1">
          <div className="team-section" id="team-section">
            <h2>Our Team</h2>
            <span className="border"></span>
            <div className="ps">
              <a href="#p1"><img src={ayman} alt="" /></a>
              <a href="#p2"><img src={qusay} alt="" /></a>
              <a href="#p3"><img src={ashar} alt="" /></a>
              <a href="#p4"><img src={nawal} alt="" /></a>
            </div>
          </div>
          
          <span className="name-">Ayman Khawaldeh</span>
          <span className="border"></span>

          <div className="par">
            <p>A Full-Stack Software Developer with a specialization in Javascript , also I have a Bachelor’s Degree in Civil Engineering and I worked before as a customer care at Crystel company </p>
            <div className="button_container">
              <a href="https://github.com/aymankhawaldeh" className="github" ><button className="btn">Github Link</button></a>
              <a href="https://www.linkedin.com/in/ayman-khawaldeh-a66486195/" className="linked" ><button className="btn">LinkedIn Link</button></a>
            </div>
          </div>
        </div>


        <div className="section" id="p2">
          <div className="team-section" id="team-section">
            <h2>Our Team</h2>
            <span className="border"></span>
            <div className="ps">
              <a href="#p1"><img src={ayman} alt="" /></a>
              <a href="#p2"><img src={qusay} alt="" /></a>
              <a href="#p3"><img src={ashar} alt="" /></a>
              <a href="#p4"><img src={nawal} alt="" /></a>
            </div>
          </div>
          <span className="name-">Qusay Hanaqtah</span>
          <span className="border"></span>

          <div className="par">
            <p>  Full-Stack web software developer, with a specialization in Javascript and a deep passion for back-end
server and API development,
Graduate of the Luminus Technical College University’s Advanced School of Computing, 401 Advanced Javascript Software Development program.</p>
            <div class="button_container">
              <a href="https://github.com/Qusai-alhanaktah" className="github" ><button className="btn">Github Link</button></a>
              <a href="https://www.linkedin.com/in/qusai-alhanakta-081091193/" className="linked" ><button className="btn">LinkedIn Link</button></a>
            </div>
          </div>
        </div>






        <div className="section" id="p3">
          <div className="team-section" id="team-section">
            <h2>Our Team</h2>
            <span className="border"></span>
            <div className="ps">
              <a href="#p1"><img src={ayman} alt="" /></a>
              <a href="#p2"><img src={qusay} alt="" /></a>
              <a href="#p3"><img src={ashar} alt="" /></a>
              <a href="#p4"><img src={nawal} alt="" /></a>
            </div>
          </div>
          <span className="name-">Ashar Oran</span>
          <span className="border"></span>
          <div className="par">
            <p>Versatile Javascript web application developer, which stems from extensive technical training and a prior background in chemical engineering.
Through my strong understanding of back-end and user interface development, I aspire to work for a company where I can contribute meaningfully to modern software projects, where I work alongside a dedicated team of passionate software engineers. </p>
            <div class="button_container">
              <a href="https://github.com/ASHARALORAN96" className="github" ><button className="btn">Github Link</button></a>
              <a href="https://www.linkedin.com/in/as-har-oran-%D8%A3%D8%B3%D8%AD%D8%A7%D8%B1-3a635416b/" className="linked" ><button className="btn">LinkedIn Link</button></a>
            </div>
          </div>
        </div>


        <div className="section" id="p4">
          <div className="team-section" id="team-section">
            <h2>Our Team</h2>
            <span className="border"></span>
            <div className="ps">
              <a href="#p1"><img src={ayman} alt="" /></a>
              <a href="#p2"><img src={qusay} alt="" /></a>
              <a href="#p3"><img src={ashar} alt="" /></a>
              <a href="#p4"><img src={nawal} alt="" /></a>
            </div>
          </div>
          <span className="name-">Nawal Suliman</span>
          <span className="border"></span>

          <div className="par">
            <p>Bachelor’s Degree in Computer Engineering from Jordan University of Science and Technology.
Javascript Software Engineer.
Senior Customer Support Specialist.
Core professional values include honesty, a hard-working nature, support and mentorship of others, and a constant desire to learn and grow. </p>
            <div class="button_container">
              <a href="https://github.com/Nsuliman" className="github" ><button className="btn">Github Link</button></a>
              <a href="https://www.linkedin.com/in/nawal-suliman-sherine/" className="linked" ><button className="btn">LinkedIn Link</button></a>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default About ;
