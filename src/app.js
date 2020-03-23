/* eslint-disable no-unused-vars */


import React from 'react';

// import SlideShow from './component/slideShow/slideShow.js';
// import loader from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Header from './component/header/header.js';
import Footer from './component/footer/footer.js';
// import Loader from 'react-loader-spinner';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: false,
    };
  }
  // componentDidMount(){
  //   this.timerHandle = this.setTimeout(() => this.setState({ loading : false}));
  // }
  // componentWillUnmount(){
  //   if(this.timerHandle){
  //     clearTimeout(this.timerHandle);
  //     this.timerHandle = 0;
  //   }
  // }
  render(){
    return(
      <>
        {/* <Loader type="ThreeDots" color='#fff' height={80} width={80}/> */}
        <Header/>
        {/* <SlideShow slides={SlideShow.slides}/> */}
        <Footer/>
      </>
    );
  }

}

export default App;

