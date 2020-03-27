import React, { Component } from 'react';
import { LoginContext } from '../component/auth/context.js';
import cartPhoto from '../assets/profile-picture.jpg';


class Profile extends Component {
    static contextType = LoginContext;

    constructor(props) {
      super(props);
      this.state = {
        image: cartPhoto,
        showUpload: false,
      };

      this.onImageChange = this.onImageChange.bind(this);
    }

  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        image: URL.createObjectURL(img),
      });
      this.setState({showUpload:!this.state.showUpload});
    }
  };
  showingUpload = e => {
    e.preventDefault();
    this.setState({showUpload:!this.state.showUpload});
  }

  render() {
    return (
      <div>


        <h1>My Profile</h1>
        <ul>
          {this.state.showUpload && (<input type="file" name="myImage" onChange={this.onImageChange} />)}
          {!this.state.showUpload && (<button onClick={this.showingUpload}>Edit My Photo</button>)}
          <img src={this.state.image} height="200" width="200"/>
          <li>{this.context.user.username}</li>
          <li>{this.context.user.capabilities}</li>
          <li>{this.context.user.userEamil}</li>
        </ul>
      </div>
    );
  }
}
export default Profile;