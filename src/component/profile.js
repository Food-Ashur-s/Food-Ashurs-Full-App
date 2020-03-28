import React, { Component } from 'react';
import { LoginContext } from '../component/auth/context.js';
import cartPhoto from '../assets/profile-picture.jpg';
import Model from './modal';
import {When} from './if';

class Profile extends Component {
    static contextType = LoginContext;

    constructor(props) {
      super(props);
      this.state = {
        image: localStorage.getItem('myphoto') || cartPhoto,
        showUpload: false,
        user: JSON.parse(localStorage.getItem('userInfo')),
        showUserUpdate: false,
        updated:{},
        updateList: JSON.parse(localStorage.getItem('newUser')),
        showUpdateList: JSON.parse(localStorage.getItem('showNewUser')),
      };

      this.onImageChange = this.onImageChange.bind(this);
    }

  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      // this.setState({
      //   image: URL.createObjectURL(img),
      // });
      localStorage.setItem('myphoto', URL.createObjectURL(img));
      this.setState({image: localStorage.getItem('myphoto')});
      this.setState({showUpload:!this.state.showUpload});
    }
  };
  showingUpload = e => {
    e.preventDefault();
    this.setState({showUpload:!this.state.showUpload});
  }

  handleChange = e => {
    this.setState({updated:{...this.state.updated, [e.target.name] : e.target.value }});
  }

  handelShowUserUpdate = e => {
    e.preventDefault();
    let showUserUpdate = !this.state.showUserUpdate;
    this.setState({showUserUpdate:showUserUpdate});
    console.log(this.state.showUserUpdate);
  }

  render() {
    return (

      <>
        <h1>My Profile</h1>
        {this.state.showUpload && (<input type="file" name="myImage" onChange={this.onImageChange} />)}
        {!this.state.showUpload && (<button onClick={this.showingUpload}>Edit My Photo</button>)}
        <img src={this.state.image } height="200" width="200"/>
        {!this.state.showUpdateList && (
          <ul>
            <li>{this.state.user.username }</li>
            <li>{this.state.user.capabilities }</li>
            <li>{this.state.user.userEamil }</li>
          </ul>
        )}
        {this.state.showUpdateList && (
          <ul>
            <li>{this.state.updated.username || this.state.updateList.username}</li>
            <li>{this.state.updated.capabilities || this.state.updateList.capabilities}</li>
            <li>{this.state.updated.userEamil || this.state.updateList.userEamil}</li>
          </ul>
        )}

        {!this.showUserUpdate && (<button onClick={this.handelShowUserUpdate}>Updae</button>)}

        <When condition={this.state.showUserUpdate}>
          <Model title='user update' close={this.handelShowUserUpdate}>
            <div className="user-updated">
              <form onSubmit={ e =>{
                localStorage.setItem('newUser', JSON.stringify(this.state.updated));
                this.setState({updateList: localStorage.setItem('newUser', JSON.stringify(this.state.updated))});
                this.setState({showUserUpdate: localStorage.setItem('showNewUser', JSON.stringify(true))});
              }} value={this.updated}>
                <label> Your Name is:
                  <input type='text' name='username' placeholder='type your name' defaultValue={this.state.user.username} onChange={this.handleChange} required />
                  <br/>
                </label>
                <label> Your role is:
                  <input type='text' name='capabilities' placeholder='type your name' defaultValue={this.state.user.capabilities} onChange={this.handleChange} required />
                  <br/>
                </label>
                <label> Your Email is:
                  <input type='text' name='userEamil' placeholder='type your name' defaultValue={this.state.user.userEamil} onChange={this.handleChange} required />
                  <br/>
                </label>
                <button >Submit</button>
              </form>
            </div>
          </Model>
        </When>
      </>
    );
  }
}
export default Profile;