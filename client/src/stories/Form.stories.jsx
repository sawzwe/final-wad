import React from 'react';
import { Login } from '../components/Login'
import 'bootstrap/dist/css/bootstrap.css';
// import { Button } from './Button';

export default {
  title: 'Form/Login',
  component: Login,
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
};

const Template = (args) => <Login {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  email: 'abc@xyz.com',
  password: '123',
  onLogin: (data) => {
    console.log(data)
  }
};

export const MissingPassword = Template.bind({});
MissingPassword.args = {
  email: 'abc@xyz.com',
  password: ''
};

export const LoginFailed = Template.bind({});
LoginFailed.args = {
  email: 'abc@xyz.com',
  password: '123',
  onLogin: (data) => {
    console.log("Simulate Login Failed")
    alert("Login Failed")
  }
};
