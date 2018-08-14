import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Players } from '../api/players.js';
Meteor.subscribe('players');

import { PlayerPageStats } from '../ui/stats.js';

import { SmallPlayerStats } from '../ui/stats.js';

import PlayerPageProjections from '../ui/PlayerPageProjections.js';

import { Projected_Stats } from '../api/projected_stats.js';

import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

class Player extends Component {
	render() {
		const { match: { params } } = this.props;
  		const player = Players.findOne({name: params.name});

		return !this.props.players_loading && !this.props.stats_loading ? (
			<div>
			    <div className="container-fluid" id="page_background" role="main">      
			      <div className="row">
			         <div className="col-md-12 col-sm-12 col-xs-12">
			            <div className="card-outline-primary player">
			              <img className="card-img-top" id="big_logo" src={player.logo} alt={player.alt} />
			              <div className="card-block">
			                <h2 className="card-title">{player.name}</h2>                  
			                <h3 className="card-text"> {player.position} - {player.team}</h3>
			                <br />				              	                 
			                    <h4><PlayerPageProjections sendPlayer={player} /></h4>	                 
			                <br />
			                	<h4><PlayerPageStats sendPlayer={player} sendProjections={this.props.projected_stats} /></h4>                	                                 			           	                 
			                <br />
			                <Link to="/team" className="btn btn-success" id="team_back">Back to Team</Link>
			              </div> 
			            </div>       
			         </div>
			       </div> 
			       <div className="row"> 				
	    				{player.position == 'QB' ? <div>
	    				<h2 className="small_headline">Other Quarterbacks:</h2>			   			    			
		    			{this.props.players.map(small_player => 
		    				small_player.position == 'QB' && small_player.name != player.name ? <div className="card-group" key={small_player._id}>
								<Link to={"/team/"+small_player.name}>			          			
			            			<div className="card col-md-2 col-sm-12 col-xs-12 small_player">              
				              			<img className="card-img-top logo" src={small_player.logo} alt={small_player.alt} />				              							              			
				              				<div className="card-block">                 
					                			<h4 className="card-title">{small_player.name}</h4>	                  
					               				<p className="card-text"><b>{small_player.position} - {small_player.team}</b></p>				               					
					               				<SmallPlayerStats sendPlayer={small_player} />				    				               				                        		                                        
			              					</div>			         			              				       
			            			</div>
		          			    </Link>
			        		</div> : null										
												
						)}
						</div> : null}
				
	    				{player.position == 'RB' ? <div>
	    				<h2 className="small_headline">Other Running Backs:</h2>				   			    			
		    			{this.props.players.map(small_player => 
		    				small_player.position == 'RB' && small_player.name != player.name ? <div className="card-group" key={small_player._id}>
								<Link to={"/team/"+small_player.name}>			          			
			            			<div className="card col-md-2 col-sm-12 col-xs-12 small_player">              
				              			<img className="card-img-top logo" src={small_player.logo} alt={small_player.alt} />
				              				<div className="card-block">                 
					                			<h4 className="card-title">{small_player.name}</h4>	                  
					               				<p className="card-text"><b>{small_player.position} - {small_player.team}</b></p> 
					               				<SmallPlayerStats sendPlayer={small_player} />	                        		                                        
			              					</div>              
			            			</div>
		          			    </Link>
			        		</div> : null									
												
						)}
						</div> : null}
									
	    				{player.position == 'WR' ? <div>
	    				<h2 className="small_headline">Other Wide Receivers:</h2>			   			    			
		    			{this.props.players.map(small_player => 
		    				small_player.position == 'WR' && small_player.name != player.name ? <div className="card-group" key={small_player._id}>
								<Link to={"/team/"+small_player.name}>			          			
			            			<div className="card col-md-2 col-sm-12 col-xs-12 small_player">              
				              			<img className="card-img-top logo" src={small_player.logo} alt={small_player.alt} />
				              				<div className="card-block">                 
					                			<h4 className="card-title">{small_player.name}</h4>	                  
					               				<p className="card-text"><b>{small_player.position} - {small_player.team}</b></p>
					               				<SmallPlayerStats sendPlayer={small_player} />	                         		                                        
			              					</div>              
			            			</div>
		          			    </Link>
			        		</div> : null									
												
						)}
						</div> : null}
				
					    {player.position == 'TE' ? <div>
	    				<h2 className="small_headline">Other Tight Ends:</h2>			   			    			
		    			{this.props.players.map(small_player => 
		    				small_player.position == 'TE' && small_player.name != player.name ? <div className="card-group" key={small_player._id}>
								<Link to={"/team/"+small_player.name}>			          			
			            			<div className="card col-md-2 col-sm-12 col-xs-12 small_player">              
				              			<img className="card-img-top logo" src={small_player.logo} alt={small_player.alt} />
				              				<div className="card-block">                 
					                			<h4 className="card-title">{small_player.name}</h4>	                  
					               				<p className="card-text"><b>{small_player.position} - {small_player.team}</b></p>
					               				<SmallPlayerStats sendPlayer={small_player} />	                         		                                        
			              					</div>              
			            			</div>
		          			    </Link>
			        		</div> : null																					
						)}
						</div> : null}			
			       </div>
		      </div>
		    </div>
		) : null
	}
}

//     

export default PlayerContainer = withTracker(() => {
  const stats_subscription = Meteor.subscribe('projected_stats');
  const players_subscription = Meteor.subscribe('players');  
  const projected_stats = Projected_Stats.find({}).fetch();
  const players = Players.find({}).fetch();		
  const currentUser = Meteor.user();
  const players_loading = !players_subscription.ready();
  const stats_loading = !stats_subscription.ready();	
  return {
  	projected_stats,
  	players,
  	players_loading,
  	stats_loading,
  	currentUser
  };
})(Player);
