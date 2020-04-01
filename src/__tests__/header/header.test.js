import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Header from '../../component/header/header.js';


describe ('<ToDoList />' , () => {

  it(' It Should be exists in our applications ', () => {
    // virtual 
    let app = shallow(<Header />);
    // find the tag which already includes in our app 
    expect(app.find('li').exists()).toBeTruthy();
  }); // end of it test 

  it(' Renders correctly ' , () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  }); // end of it test for render 

}); // end of describe test 