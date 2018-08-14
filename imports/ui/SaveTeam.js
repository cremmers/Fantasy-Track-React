import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Players } from '../api/players.js';

import { Teams } from '../api/teams.js';

import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
 
class SaveTeamForm extends Component {
	constructor(props) {
		super(props);
		this.state = {teamName: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({teamName: event.target.value}); 
	}

	handleSubmit(event) {
		event.preventDefault();

		// set update variable to false and send to parent component
		let save_update = true;
		this.props.saveUpdateChange(save_update);

		// set save variable to true and send to parent component
		let save_save = false;
		this.props.saveSaveChange(save_save);

		// get ids of selected players
		let player_elements = document.getElementById('roster_list').getElementsByTagName('li');
		let players_selected = document.getElementById('roster_list').querySelectorAll('a');
		console.log(players_selected);
		let player_array = [];
		let save_player_array = [];

		// check to see if players exist in each player slot
		if (player_elements.length == players_selected.length) {
			// loop through selected players and push players into array
			for (let i=0; i < player_elements.length; i++) {
				player_array.push(player_elements[i].querySelector('a').id);
			};
				
			// get players from Players collection
			for (let j=0; j < player_array.length; j++) {
				let save_player = Players.findOne({_id: player_array[j]});
				save_player_array.push(save_player);
			};

			// create team object and send to collection
			const addedTeam = {name: this.state.teamName, createdOn: new Date(), createdBy: Meteor.userId(), players: save_player_array};

			Meteor.call('teams.insert', addedTeam, function (error, result) {
				if (error && error.error === "Duplicate team found.") {
					Alert.error("Team name already exists.", {stack: true, effect: 'slide', offset: 100});
				}
				else if (error) {
					Alert.error("Unknown error.", {stack: true, effect: 'slide', offset: 100});
				}
				else {
					Session.setPersistent('loadedTeam', result);
					Alert.success("Team saved!", {stack: true, effect: 'slide', offset: 100});
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
			 {this.props.saveSet ?			
				<form onSubmit={this.handleSubmit} id='js-save'>
					<label>
						<input type='text' placeholder='Enter a team name.' value={this.state.teamName} onChange={this.handleChange} required/>
					</label>
					<input type='submit' className='btn btn-success' id='save_team' value='Save Team'/>
				</form>	
			: null}	
			</div> 
		) 	
	}
}

export default SaveTeamFormContainer = withTracker(() => {
  Meteor.subscribe('teams');
  const teams = Teams.find({}).fetch();
  const currentUser = Meteor.user();
  return {
    teams,
    currentUser
  };
})(SaveTeamForm);