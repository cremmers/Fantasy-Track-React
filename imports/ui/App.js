import React, { Component } from 'react';
import {Router, Route} from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Teams } from '../api/teams.js';

import PlayerList from './PlayerList.js';

import { SearchPlayer } from './PlayerList.js';

import LoadTeamForm from './LoadTeam.js';

import SaveTeamForm from './SaveTeam.js';

import UpdateTeamForm from './UpdateTeam.js';

import DeleteTeamForm from './DeleteTeam.js';

import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';

import AccountsUIWrapper from './AccountsUIWrapper.js';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {saveButton: true, updateButton: false};

		this.handleSave = this.handleSave.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
	}

	// switch state of save button when value comes in from child component
	handleSave (saveState) {
        this.setState({ saveButton: saveState });
    }

    // swtich state of update button when value comes in from child component
    handleUpdate (updateState) {
        this.setState({ updateButton: updateState });
    }

	render() {
		return !this.props.loading ? (
			<div>		       		       
			  <div className="container-fluid" id="page_background">
				<div className="row">
    				<div className="col-md-6 col-sm-12 col-xs-12">
      					<h1 id="player_header">Players<a href="#roster" className="btn btn-info" id="team_button">Roster</a></h1>
      					<SearchPlayer />
				        <ul className="list-group" id="player_list">
				          <PlayerList />
				        </ul>
				    </div>
			        <div className="col-md-6 col-sm-12 col-xs-12" id="roster">
			          <h1 id="team_header">Roster</h1>
				          <ul className="list-group" id="roster_list">
				            <li className="list-group-item" id="p-1">
				              <p>QB</p>
				            </li>
				            <li className="list-group-item" id="p-2">
				              <p>RB1</p>
				            </li>
				            <li className="list-group-item" id="p-3">
				              <p>RB2</p>
				            </li>
				            <li className="list-group-item" id="p-4">
				              <p>WR1</p>
				            </li>
				            <li className="list-group-item" id="p-5">
				              <p>WR2</p>
				            </li>
				            <li className="list-group-item" id="p-6">
				              <p>W/R/T</p>
				            </li>
				            <li className="list-group-item" id="p-7">
				              <p>TE</p>
				            </li>				  
				          </ul>
				       {this.props.currentUser ?
				       <div>		        
				           <SaveTeamForm saveSet={this.state.saveButton} saveSaveChange={this.handleSave} saveUpdateChange={this.handleUpdate} />
	        		   </div>
	        		   : null} 
	        		   <div>
	        		   	   <UpdateTeamForm updateSet={this.state.updateButton} />
	        		   	   <br />
	        		   </div>       			  
        			   {this.props.noTeam == false ?
        			    <div>    			
				           	<LoadTeamForm updateSave={this.handleSave} updateChange={this.handleUpdate} />
				           	<br />
			           	</div>
			           : null} 		              		               
			          <ResetButton resetSaveChange={this.handleSave} resetUpdateChange={this.handleUpdate} />
			          <br />
			          <DeleteTeamForm updateSet={this.state.updateButton} deleteSaveChange={this.handleSave} deleteUpdateChange={this.handleUpdate} /> 
			          <br />     
			          <a href="#player_header" className="btn btn-info" id="player_back">Back to Players</a>
			        </div>
				</div>         
		      </div>
		    <Alert /> 
      		</div>
		) : null
	}
}

export class NavBar extends Component {
	render() {
		return (
			<div>
			<nav className="navbar navbar-default navbar-fixed-top">
  				<div className="container-fluid" id="navbar_container">
    				<div className="navbar-header">
      					<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#collapse" aria-expanded="false">
				           	<span className="icon-bar"></span>
				            <span className="icon-bar"></span>
				            <span className="icon-bar"></span>
      					</button>
			            <a href="/" className="navbar-brand"><img src="https://upload.wikimedia.org/wikipedia/commons/1/1b/American_football_icon_simple.svg" alt="football logo" className="logo"/></a>    
			            <a href="/" className="navbar-brand">Team Track</a>
    				</div>
    				<div className="collapse navbar-collapse" id="collapse">     
      					<ul className="nav navbar-nav navbar-right">
      						<AccountsUIWrapper />
		          		</ul>
			        </div>
		        </div>
		    </nav>
		    </div>  
		)
	}
}

class ResetButton extends Component {
  constructor(props) {
	super(props);

	this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
	event.preventDefault();

	// set update variable to false and send to parent component
	let reset_update = false;
	this.props.resetUpdateChange(reset_update);

	// set save variable to true and send to parent component
	let reset_save = true;
	this.props.resetSaveChange(reset_save);

	// delete players and create player rows   
	document.getElementById('roster_list').innerHTML = '';
    for (let i=1; i<=7; i++) {
    	let empty_player = document.createElement('li');	
		empty_player.setAttribute('class','list-group-item');
		empty_player.setAttribute('id','p-' + [i]);
		document.getElementById('roster_list').appendChild(empty_player);
    }

    // create and attach text nodes for each position
    let qb = document.createElement('p');
    let QB = document.createTextNode('QB');
	qb.appendChild(QB);
	document.getElementById('p-1').appendChild(qb);

	let rb1 = document.createElement('p');
    let RB1 = document.createTextNode('RB1');
	rb1.appendChild(RB1);
	document.getElementById('p-2').appendChild(rb1);

	let rb2 = document.createElement('p');
    let RB2 = document.createTextNode('RB2');
	rb2.appendChild(RB2);
	document.getElementById('p-3').appendChild(rb2);

	let wr1 = document.createElement('p');
    let WR1 = document.createTextNode('WR1');
	wr1.appendChild(WR1);
	document.getElementById('p-4').appendChild(wr1);

	let wr2 = document.createElement('p');
    let WR2 = document.createTextNode('WR2');
	wr2.appendChild(WR2);
	document.getElementById('p-5').appendChild(wr2);

	let wrt = document.createElement('p');
    let WRT = document.createTextNode('W/R/T');
	wrt.appendChild(WRT);
	document.getElementById('p-6').appendChild(wrt);

	let te = document.createElement('p');
    let TE = document.createTextNode('TE');
	te.appendChild(TE);
	document.getElementById('p-7').appendChild(te);

  }
  render() {
  	return (
  	<div>
  		<button className="btn btn-danger" id="reset_team" onClick={this.handleClick}>Reset</button>
  	</div>
  	)
  }
}

export default AppContainer = withTracker(() => {
  const subscription = Meteor.subscribe('teams');
  const currentUser = Meteor.user();
  const loading = !subscription.ready();
  const noTeam = !Teams.findOne();	
  return {
  	loading,
  	noTeam,
  	currentUser
  };
})(App);
