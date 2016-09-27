import React, { Component } from 'react'
import MainEditor from './MainEditor'
import LoginComponent from './LoginComponent'
import * as firebase from 'firebase';

export default class App extends Component {

  constructor(){
    super();

    var config = {
      apiKey: "AIzaSyD9qsGFiReHxPFuDdUlB-7o3WTQiuNXecI",
      authDomain: "notizn-81721.firebaseapp.com",
      databaseURL: "https://notizn-81721.firebaseio.com",
      storageBucket: "",
      messagingSenderId: "1029736411384"
    };

    var firebase_init = firebase.initializeApp(config);

    this.state = {
      // should not be set to false - otherwise the login screen would initally be loaded
      isLoggedIn: "not set",
      firebaseApp: firebase_init,
      currentUser: ''
    }
  }

  componentWillMount() {

    this.state.firebaseApp.auth().onAuthStateChanged(function(user) {
      if (user){
        this.setState({
          isLoggedIn: true,
          currentUser: user.uid
        });
      }
      else if (!user) {
        this.setState({
          isLoggedIn: false,
          currentUser: ''
        })
      }
    }.bind(this));

  }

  getUserData(){
    var user = this.state.firebaseApp.auth().currentUser;
    if (user) {
      // User is signed in.

      this.setState({
        isLoggedIn: true,
        currentUser: user.uid
      });
    } else {
      // No user is signed in.
      setTimeout(function(){ this.getUserData(); }.bind(this), 1000);

    }
    console.log(this.state)
  }

  componentDidMount(){
    this.getUserData();
  }

  render () {
    if(this.state.isLoggedIn && this.state.currentUser != ''){
      return (
        <MainEditor firebaseApp={this.state.firebaseApp} currentUser={this.state.currentUser} />
      )
    }
    else if(!this.state.isLoggedIn){
      return (
        <LoginComponent firebaseApp={this.state.firebaseApp} currentUser={this.state.currentUser} />
      )
    }else{
      return(
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      )
    }
  }
}
