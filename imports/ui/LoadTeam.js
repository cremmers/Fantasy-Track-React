import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Players } from '../api/players.js';

import { Teams } from '../api/teams.js';

import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

class LoadTeamForm extends Component {
	constructor(props) {
		super(props);	
		this.state = {teamName: this.props.teams[0].name};
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (this.props.teams !== prevProps.teams) {
			if (this.props.noTeam == false) {
				this.setState({teamName: this.props.teams[0].name});
			}
			else {
				this.setState({teamName: ''});
			}
		}
	}

	handleChange(event) {
		this.setState({teamName: event.target.value}); 
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log(this.state);

		// find team in collection and set session to team that is found
		let team = Teams.findOne({name: this.state.teamName});
		console.log(this.state.teamName);
		Session.setPersistent('loadedTeam', team);

		// set save variable to false and send information to parent component
		let show_save = false;
		this.props.updateSave(show_save);

		// set update variable to true and send information to parent component
		let show_update = true;
		this.props.updateChange(show_update);

		// empty roster list		
		document.getElementById('roster_list').innerHTML = '';	
				
		// create table slots and delete buttons and place players
		for (let i=0; i < team.players.length; i++) {
			let load_player = document.createElement('li');
			load_player.setAttribute('class','list-group-item');
			load_player.setAttribute('id','p-' + [i+1]);
			
			let _id = team.players[i]._id;			
			let name = team.players[i].name;
			let position = team.players[i].position;
			let player_team = team.players[i].team;		
			let logo = team.players[i].logo;
			let alt = team.players[i].alt;				
			
			let logo_element = document.createElement("img");
			logo_element.setAttribute('src',logo);
	        logo_element.setAttribute('class','logo');
	        logo_element.setAttribute('alt',alt);
	        load_player.appendChild(logo_element);

			let name_element = document.createElement('a');
			let position_element = document.createElement('p');
			let team_element = document.createElement('p');
			name_element.setAttribute('id',_id);
			name_element.innerHTML = ' ' + name + ' ';
			position_element.innerHTML = '-' + ' ' + position + ' ' + '-';
			team_element.innerHTML = ' ' + player_team + ' ';

			load_player.appendChild(name_element);
			load_player.appendChild(position_element);
			load_player.appendChild(team_element);

			let delete_player = document.createElement('button');
  			let x = document.createTextNode('x');
  			delete_player.appendChild(x);
  			load_player.appendChild(delete_player);
  			delete_player.setAttribute('id','p' + [i+1] + '-del');
  			delete_player.setAttribute('class','delete_button');
			document.getElementById('roster_list').appendChild(load_player);
		}

		// create empty slot in table when delete button is clicked
		document.getElementById('p1-del').onclick = function() {
			let empty_player = document.createElement('li');	
			empty_player.setAttribute('class','list-group-item');					
			empty_player.setAttribute('id','p-1');
			let p = document.createElement('p');
			let QB = document.createTextNode('QB');
			p.appendChild(QB);
			empty_player.appendChild(p);
			let QB_slot = document.getElementById('p1-del').parentNode;
			document.getElementById('p1-del').parentNode.parentNode.replaceChild(empty_player, QB_slot);					
		}
		document.getElementById('p2-del').onclick = function() {
			let empty_player = document.createElement('li');	
			empty_player.setAttribute('class','list-group-item');					
			empty_player.setAttribute('id','p-2');
			let p = document.createElement('p');
			let RB1 = document.createTextNode('RB1');
			p.appendChild(RB1);
			empty_player.appendChild(p);
			let RB1_slot = document.getElementById('p2-del').parentNode;
			document.getElementById('p2-del').parentNode.parentNode.replaceChild(empty_player, RB1_slot);					
		}
		document.getElementById('p3-del').onclick = function() {
			let empty_player = document.createElement('li');	
			empty_player.setAttribute('class','list-group-item');
			empty_player.setAttribute('id','p-3');
			let p = document.createElement('p');
			let RB2 = document.createTextNode('RB2');
			p.appendChild(RB2);
			empty_player.appendChild(p);
			let RB2_slot = document.getElementById('p3-del').parentNode;
			document.getElementById('p3-del').parentNode.parentNode.replaceChild(empty_player, RB2_slot);	
		}
		document.getElementById('p4-del').onclick = function() {
			let empty_player = document.createElement('li');	
			empty_player.setAttribute('class','list-group-item');
			empty_player.setAttribute('id','p-4');
			let p = document.createElement('p');
			let WR1 = document.createTextNode('WR1');
			p.appendChild(WR1);
			empty_player.appendChild(p);
			let WR1_slot = document.getElementById('p4-del').parentNode;
			document.getElementById('p4-del').parentNode.parentNode.replaceChild(empty_player, WR1_slot);
		}
		document.getElementById('p5-del').onclick = function() {
			let empty_player = document.createElement('li');	
			empty_player.setAttribute('class','list-group-item');
			empty_player.setAttribute('id','p-5');
			let p = document.createElement('p');
			let WR2 = document.createTextNode('WR2');
			p.appendChild(WR2);
			empty_player.appendChild(p);
			let WR2_slot = document.getElementById('p5-del').parentNode;
			document.getElementById('p5-del').parentNode.parentNode.replaceChild(empty_player, WR2_slot);	
		}
		document.getElementById('p6-del').onclick = function() {
			let empty_player = document.createElement('li');	
			empty_player.setAttribute('class','list-group-item');
			empty_player.setAttribute('id','p-6');
			let p = document.createElement('p');
			let WRT = document.createTextNode('W/R/T');
			p.appendChild(WRT);
			empty_player.appendChild(p);
			let WRT_slot = document.getElementById('p6-del').parentNode;
			document.getElementById('p6-del').parentNode.parentNode.replaceChild(empty_player, WRT_slot);
		}
		document.getElementById('p7-del').onclick = function() {
			let empty_player = document.createElement('li');	
			empty_player.setAttribute('class','list-group-item');
			empty_player.setAttribute('id','p-7');
			let p = document.createElement('p');
			let TE = document.createTextNode('TE');
			p.appendChild(TE);
			empty_player.appendChild(p);
			let TE_slot = document.getElementById('p7-del').parentNode;
			document.getElementById('p7-del').parentNode.parentNode.replaceChild(empty_player, TE_slot);
		}
		
		Alert.success('Team Loaded!', {stack: true, effect: 'slide', offset: 100});									
	}

	render() {
		return (
			<div>
				{this.props.currentUser ?			
				<form onSubmit={this.handleSubmit}>
				<label>
					<select value={this.state.teamName} onChange={this.handleChange}>
						{this.props.teams.map(team => <option key={team._id} value={team.name}>{team.name}</option>)}
					</select>
				</label>
				<input type='submit' className='btn btn-primary' id='load_team' value='Load Team'/>			
				</form> 
				: null}
			</div>
		) 
	}
}

export default LoadTeamFormContainer = withTracker(() => {
  const subscription = Meteor.subscribe('teams'); 
  const teams = Teams.find({}).fetch();
  const currentUser = Meteor.user();
  const noTeam = !Teams.findOne();
  return {
    teams,
    currentUser,
    noTeam
  };
})(LoadTeamForm);