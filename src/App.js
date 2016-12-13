import './App.css';
import $ from 'jquery'

import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import searchArtist from './actions/searchArtist'
import getUserId from './actions/getUserId'
import getUsers from './actions/getUsers'
import logUserIn from './actions/logUserIn'
import logUserOut from './actions/logUserOut'
import signUserUp from './actions/signUserUp'
import getSongs from './actions/getSongs'
import getSongsFromPlaylist from './actions/getSongsFromPlaylist'

import User from './components/users'
import Home from './components/home.js'
import ArtistList from './components/artist_list'
import SongList from './components/song_list'
import FutureSongList from './components/future_song_list'
import SearchBar from './components/search_bar'
import LoginForm from './components/login_form'
import SignUpForm from './components/signup_form'

class App extends Component {
  constructor(props){
    super(props)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
    this.handleSuggestionClick = this.handleSuggestionClick.bind(this)
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this)
  }

  componentWillMount(){
    //check to see if a user is logged in with an action and set state accordingly
    this.props.getUserId()
    browserHistory.push('/')
  }

  handleLogoutClick(){
    this.props.logUserOut()
  }
  handleSuggestionClick(){
    this.props.getSongsFromPlaylist(this.props.user_id)
  }

  handleSignupSubmit(signup_params){
    this.props.signUserUp(signup_params)
  }

  render() {
    return (
      <div>
        {localStorage.jwt ?
          <div>
            <h3 id="welcome-back">Welcome back!</h3>
            <button className="register-image" onClick={this.handleLogoutClick}>Logout</button>
            <button id="login-image" onClick={this.handleSuggestionClick}>Saved Songs</button>
          </div>
          :
          <div>
            <SignUpForm onSignupClick={this.handleSignupSubmit} />
            <LoginForm />
          </div>
        }
          <SearchBar />
          {this.props.savedSongs ? <FutureSongList songs={this.props.savedSongs} /> : <p></p>}
          <ArtistList />
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    user_id: state.user_id, jwt: state.jwt,
    logged_in: state.logged_in, songs: state.songs,
    artist: state.artist, artistToSpecify: state.artistToSpecify,
    newArtists: state.newArtists, existingArtists: state.existingArtists,
    savedSongs: state.savedSongs
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getUsers: getUsers, logUserIn: logUserIn,
    signUserUp: signUserUp, logUserOut: logUserOut, searchArtist: searchArtist,
    getSongs: getSongs, getSongsFromPlaylist: getSongsFromPlaylist, getUserId: getUserId }, dispatch)
}

export default connect(mapStateToProps ,mapDispatchToProps)(App);

{/* <Home
   handleClick={this.handleClick}
   searchClick={this.handleSearchSubmit}
   results={this.props.results}
   artists={this.props.artistToSpecify}
   getSongs={this.props.getSongs}
   songs={this.props.songs}
   artist={this.props.artist}
   newArtists={this.props.newArtists}
   existingArtists={this.props.existingArtists}
/> */}
