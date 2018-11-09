import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Players } from '../api/players.js';

import { Teams } from '../api/teams.js';

import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

class UpdateTeamForm extends Component {
	constructor(props) {
		super(props);	
		
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		event.preventDefault();

		let selectedTeam = Session.get('loadedTeam');
		console.log(selectedTeam);
		let player_elements = document.getElementById('roster_list').getElementsByTagName('li');
		let players_selected = document.getElementById('roster_list').querySelectorAll('p.selected_player');
		console.log(player_elements);
		console.log(players_selected);
		let player_array = [];
		let update_player_array = [];

		// check to see if players exist in each player slot
		if (player_elements.length == players_selected.length) {
			// loop through selected players and push players into array
			for (let i=0; i < player_elements.length; i++) {
				player_array.push(player_elements[i].querySelector('p.selected_player').innerHTML.trim());
			};
				
			// get players from Players collection
			for (let j=0; j < player_array.length; j++) {
				let update_player = Players.findOne({name: player_array[j]});
				update_player_array.push(update_player);
			};

			// get name, createdOn, and createdBy properties
			let name = selectedTeam.name;
			let createdOn = new Date();
			let createdBy = Meteor.userId();

			// create team object and send to collection
			const updatedTeam = {name, createdOn, createdBy, players: update_player_array};
			console.log(updatedTeam);

			Meteor.call('teams.update', selectedTeam, updatedTeam, function (error, result) {
				if (error && error.error === "No update.") {
					console.log('No change error');
					Alert.error("No change was made to the team.", {stack: true, effect: 'slide', offset: 100});
				}
				else if (error) {
					Alert.error("Unknown error.", {stack: true, effect: 'slide', offset: 100});
				}
				else {
					Session.setPersistent('loadedTeam', result);
					Alert.success("Team updated!", {stack: true, effect: 'slide', offset: 100});
				}
			});
		}
		else {
			Alert.error("A position is missing.", {stack: true, effect: 'slide', offset: 100});
		}
	}

	render() {
		return (
			<div>
				{this.props.updateSet ? 
					<div>
						<button className='btn btn-primary' id='update_team' onClick={this.handleClick}>Update Roster</button> 
						<Link to='/team' className='btn btn-success' id='team_page'>Go To Team Page</Link>
					</div>
				: null}
			</div>
		) 
	}
}

export default UpdateTeamFormContainer = withTracker(() => {
  Meteor.subscribe('players');
  Meteor.subscribe('teams');
  const players = Players.find({}).fetch(); 
  const teams = Teams.find({}).fetch();
  const currentUser = Meteor.user(); 
  return {
  	players,
    teams,
    currentUser
  };
})(UpdateTeamForm);
