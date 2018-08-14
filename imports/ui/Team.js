import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Teams } from '../api/teams.js';

import { TeamPageStats } from '../ui/stats.js';

import TeamPageProjections from '../ui/TeamPageProjections.js';

import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

class Team extends Component {
	render() {
		return !this.props.loading ? (
			<div>
			    <div className="container-fluid" id="page_background" role="main">      
			      <div className="row">
			         <div className="col-md-12 col-sm-12 col-xs-12" id="roster">			         
			            <ul className="list-group" id="team_list">
			              {this.props.current_team.map(team => <div key={team._id} value={team._id}>
			              	<h1 id="team_header">{team.name}</h1>
			              	{team.players.map(player => <Link to={"/team/"+player.name} key={player._id}><li className="list-group-item">			                   			
				                <img className="logo" src={player.logo} alt={player.alt} />
				                <b> {player.name}</b>
				                <p> - {player.position}</p>
				                <p> - {player.team}</p>
				                <br />			               
				                <TeamPageProjections sendPlayer={player} /> 		               				              			               
				               	<TeamPageStats sendPlayer={player} />					               			                		                  
			                </li></Link>)}			                	
		                  </div>)}		   
			            </ul>                      			         
			         </div>			  
			         <Link to="/" className="btn btn-success" id="back_home">Back to Home Page</Link> 
			      </div>
			    </div>
			</div>   			
		) : null
	}
};

export default TeamContainer = withTracker(() => {
  const team_subscription = Meteor.subscribe('teams');
  const loaded_team = Session.get('loadedTeam');
  const current_team = [];
  current_team.push(loaded_team);
  console.log(loaded_team);
  const currentUser = Meteor.user();
  const loading = !team_subscription.ready();	
  return {
  	current_team,
  	loading,
  	currentUser
  };
})(Team);