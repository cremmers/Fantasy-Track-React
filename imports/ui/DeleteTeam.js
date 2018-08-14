import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Teams } from '../api/teams.js';

import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

class DeleteTeamForm extends Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		event.preventDefault();
		let loadedTeam = Session.get('loadedTeam');
		Session.set('loadedTeam', undefined);
		delete Session.keys.loadedTeam; 
		console.log(loadedTeam);
		console.log(this.state);

		// set update variable to false and send to parent component
		let delete_update = false;
		this.props.deleteUpdateChange(delete_update);

		// set save variable to true and send to parent component
		let delete_save = true;
		this.props.deleteSaveChange(delete_save);

		Meteor.call('teams.delete', loadedTeam, function (error, result) {
			if (error) {
				Alert.error("Unknown error.", {stack: true, effect: 'slide', offset: 100});
			}
			else {
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

				Alert.success("Team deleted!", {stack: true, effect: 'slide', offset: 100});
			}
		});
	}

	render() {
		return (
			<div>
				{this.props.updateSet ? 
					<button className="btn btn-danger" onClick={this.handleClick} id="delete_team">Delete Team</button>
				: null}
			</div>
		)
	}
}

export default DeleteTeamFormContainer = withTracker(() => {
  const subscription = Meteor.subscribe('teams');
  const loaded_team = Session.get('loadedTeam');
  const currentUser = Meteor.user();
  const loading = !subscription.ready();	
  return {
  	loaded_team,
  	loading,
  	currentUser
  };
})(DeleteTeamForm);