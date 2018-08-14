import React, { Component } from 'react';
import {Router, Route, Link} from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Players } from '../api/players.js';
Meteor.subscribe('players');

export class TeamPageStats extends Component {
	constructor(props) {
		super(props);
		this.state = {error: null, isLoaded: false, stats: ''};		
	}

	componentDidMount() {
		fetch ('http://api.fantasy.nfl.com/v1/players/stats?statType=seasonStats&season=2017&week=1&format=json')
		.then(results => {
			return results.json();
		}).then((data) => {
				console.log(data);
				this.setState({isLoaded: true, stats: data.players});
				console.log(this.state);
			},
			(error) => {
				this.setState({isLoaded: true, error});
			}
		)
	}

	render() {
		const {error, isLoaded, stats} = this.state;
		if (error) {
			 return <p>Error: {error.message}</p>;
    	} 
    	else if (!isLoaded) {
      		return <p>Loading Stats...</p>;
    	} 
    	else {
    		return (
    			stats.map((player) => {
					if (player.name == this.props.sendPlayer.name && player.position == 'QB') {
						return (
							<div key={player.id}>
								<p><b>2017 Passing Stats: </b> Passing Yards: {player.stats[5]}, Passing TDs: {player.stats[6]}, Interceptions: {player.stats[7]}</p>
								<br />
								<p><b>2017 Rushing Stats: </b> Rushing Yards: {player.stats[14]}, </p> 

								{player.stats[15] ? <p>Rushing TDs: {player.stats[15]}, </p> : <p>Running TDs: 0, </p>} 
								{player.stats[31] ? <p>Fumbles: {player.stats[31]}</p> : <p>Fumbles: 0</p>}						
							</div> 
						)
					}
					else if (player.name == this.props.sendPlayer.name && player.position == 'RB') {
						return (
							<div key={player.id}>
								<p><b>2017 Rushing Stats: </b> Rushing Yards: {player.stats[14]}, </p>
								{player.stats[15] ? <p>Rushing TDs: {player.stats[15]}, </p> : <p>Rushing TDs: 0, </p>}
								{player.stats[31] ? <p>Fumbles: {player.stats[31]}</p> : <p>Fumbles: 0</p>}
								<br />
								<p><b>2017 Receiving Stats: </b></p>
								{player.stats[21] ? <p>Receiving Yards: {player.stats[21]}, </p> : <p>Receiving Yards: 0, </p>}
								{player.stats[22] ? <p>Receiving TDs: {player.stats[22]}</p> : <p>Receiving TDs: 0</p>}
							</div>
						)
					}
					else if (player.name == this.props.sendPlayer.name && player.position == 'WR' && player.id != 2559368) {
						return (
							<div key={player.id}>
								<p><b>2017 Receiving Stats: </b> Receiving Yards: {player.stats[21]}, </p>
								{player.stats[22] ? <p>Receiving TDs: {player.stats[22]}, </p> : <p>Receiving TDs: 0, </p>}
								{player.stats[31] ? <p>Fumbles: {player.stats[31]}</p> : <p>Fumbles: 0</p>}	
							</div>
						)
					}
					else if (player.name == this.props.sendPlayer.name && player.position == 'TE') {
						return (
							<div key={player.id}>
								<p><b>2017 Receiving Stats: </b> Receiving Yards: {player.stats[21]}, </p>
								{player.stats[22] ? <p>Receiving TDs: {player.stats[22]}, </p> : <p>Receiving TDs: 0, </p>}
								{player.stats[31] ? <p>Fumbles: {player.stats[31]}</p> : <p>Fumbles: 0</p>}	
							</div>
						)
					}
				})
    		)
		}
	}			
}

export class PlayerPageStats extends Component {
	constructor(props) {
		super(props);
		this.state = {error: null, isLoaded: false, stats: ''};		
	}

	componentDidMount() {
		fetch ('http://api.fantasy.nfl.com/v1/players/stats?statType=seasonStats&season=2017&week=1&format=json')
		.then(results => {
			return results.json();
		}).then((data) => {
				this.setState({isLoaded: true, stats: data.players});
			},
			(error) => {
				this.setState({isLoaded: true, error});
			}
		)
	}

	render() {
		let projected_stats = this.props.sendProjections;
		const {error, isLoaded, stats} = this.state;

		if (error) {
			 return <p>Error: {error.message}</p>;
    	} 
    	else if (!isLoaded) {
      		return <p>Loading Stats...</p>;
    	} 
    	else {
    		return (
    			stats.map((player) => {
					if (player.name == this.props.sendPlayer.name && player.position == 'QB') {
						return (
							<div key={player.id}>
								<div>
									<h4 className="card-text"><b>2017 Passing Stats: </b> Passing Yards: {player.stats[5]}, Passing TDs: {player.stats[6]}, Interceptions: {player.stats[7]}</h4>							
									<span className="card-text"><b>2017 Rushing Stats: </b> Rushing Yards: {player.stats[14]}, </span>
									
									{player.stats[15] ? <span className="card-text">Rushing TDs: {player.stats[15]}, </span> : <span className="card-text">Running TDs: 0, </span>} 
									{player.stats[31] ? <span className="card-text">Fumbles: {player.stats[31]}</span> : <span className="card-text">Fumbles: 0</span>}	
								</div>							
								<br />								  
	            					{player.stats[5] >= 4000 ? <div className="stats_icon"><h4 className="card-text"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/AmFBfield.svg" alt="football field" className="good_year"/><b>4000 yard passer!</b></h4></div> : null }	        					
	        					<CheckProjected sendName={player.name} sendPoints={player.seasonPts} sendProjected={projected_stats} />
	        					
						        <div className="stats_icon"> 
						            {player.seasonPts > 250 ? <h4 className="card-text"><img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/American_football_icon.svg" alt="football helmet" className="starter"/><b>Starter</b></h4> : <h4 className="card-text"><img src="https://upload.wikimedia.org/wikipedia/commons/1/1c/ClipboardClipart.svg" alt="clipboard" className="bench_player"/><b>Bench Player</b></h4>}
						        </div>	               
						    </div> 
						)
					}
					else if (player.name == this.props.sendPlayer.name && player.position == 'RB') {
						let combined_yards = Number(player.stats[14]) + Number(player.stats[21]);
						return (
							<div key={player.id}>
								<div>
									<h4><span className="card-text"><b>2017 Rushing Stats: </b> Rushing Yards: {player.stats[14]}, </span>
									{player.stats[15] ? <span className="card-text">Rushing TDs: {player.stats[15]}, </span> : <span className="card-text">Rushing TDs: 0, </span>}
									{player.stats[31] ? <span className="card-text">Fumbles: {player.stats[31]}</span> : <span className="card-text">Fumbles: 0</span>}</h4>

									<span className="card-text"><b>2017 Receiving Stats: </b></span> 
									{player.stats[21] ? <span className="card-text">Receiving Yards: {player.stats[21]}, </span> : <span className="card-text">Receiving Yards: 0, </span>} 
									{player.stats[22] ? <span className="card-text">Receiving TDs: {player.stats[22]}</span> : <span className="card-text">Receiving TDs: 0</span>}
								</div>
								<br />							
									{player.stats[14] >= 1000 ? <div className="stats_icon"><h4 className="card-text"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/AmFBfield.svg" alt="football field" className="good_year"/><b>1000 yard rusher!</b></h4></div> : null }																							
									{combined_yards >= 1000 ? <div className="stats_icon"><h4 className="card-text"><img src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Football_Icon.svg" alt="football" className="good_year"/><b>1000 combined yards!</b></h4></div> : null }																
								<CheckProjected sendName={player.name} sendPoints={player.seasonPts} sendProjected={projected_stats} />
								
						        <div className="stats_icon"> 
						            {player.seasonPts > 140 ? <h4 className="card-text"><img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/American_football_icon.svg" alt="football helmet" className="starter"/><b>Starter</b></h4> : <h4 className="card-text"><img src="https://upload.wikimedia.org/wikipedia/commons/1/1c/ClipboardClipart.svg" alt="clipboard" className="bench_player"/><b>Bench Player</b></h4>}
						        </div>	         
							</div>
						)
					}
					else if (player.name == this.props.sendPlayer.name && player.position == 'WR' && player.id != 2559368) {
						return (
							<div key={player.id}>
								<h4><span className="card-text"><b>2017 Receiving Stats: </b> Receiving Yards: {player.stats[21]}, </span>
								{player.stats[22] ? <span className="card-text">Receiving TDs: {player.stats[22]}, </span> : <span className="card-text">Receiving TDs: 0, </span>}
								{player.stats[31] ? <span className="card-text">Fumbles: {player.stats[31]}</span> : <span className="card-text">Fumbles: 0</span>}</h4>
								<br />								
									{player.stats[21] >= 1000 ? <div className="stats_icon"><h4 className="card-text"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/AmFBfield.svg" alt="football field" className="good_year"/><b>1000 yard receiver!</b></h4></div> : null }								
				               	<CheckProjected sendName={player.name} sendPoints={player.seasonPts} sendProjected={projected_stats} />
				               					 
						        <div className="stats_icon"> 
						            {player.seasonPts > 120 ? <h4 className="card-text"><img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/American_football_icon.svg" alt="football helmet" className="starter"/><b>Starter</b></h4> : <h4 className="card-text"><img src="https://upload.wikimedia.org/wikipedia/commons/1/1c/ClipboardClipart.svg" alt="clipboard" className="bench_player"/><b>Bench Player</b></h4>}
						        </div>	         
							</div>
						)
					}
					else if (player.name == this.props.sendPlayer.name && player.position == 'TE') {
						return (
							<div key={player.id}>
								<h4><span className="card-text"><b>2017 Receiving Stats: </b> Receiving Yards: {player.stats[21]}, </span>
								{player.stats[22] ? <span className="card-text">Receiving TDs: {player.stats[22]}, </span> : <span className="card-text">Receiving TDs: 0, </span>}
								{player.stats[31] ? <span className="card-text">Fumbles: {player.stats[31]}</span> : <span className="card-text">Fumbles: 0</span>}</h4>
								<br />								
									{player.stats[21] >= 1000 ? <div className="stats_icon"><h4 className="card-text"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/AmFBfield.svg" alt="football field" className="good_year"/><b>1000 yard receiver!</b></h4></div> : null }								
								<CheckProjected sendName={player.name} sendPoints={player.seasonPts} sendProjected={projected_stats} />
								
						        <div className="stats_icon"> 
						            {player.seasonPts > 80 ? <h4 className="card-text"><img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/American_football_icon.svg" alt="football helmet" className="starter"/><b>Starter</b></h4> : <h4 className="card-text"><img src="https://upload.wikimedia.org/wikipedia/commons/1/1c/ClipboardClipart.svg" alt="clipboard" className="bench_player"/><b>Bench Player</b></h4>}
						        </div>	         	
							</div>
						)
					}
				})
			)
		}
	}	
}

class CheckProjected extends Component {
	render() {
		function matchPlayer (player, projected_stats) {
			let  matchedPlayers = [];
			for (let i in projected_stats) {   
        		if (projected_stats[i].Player.indexOf(player) != -1) {
            		matchedPlayers.push(projected_stats[i].Player);
        		}
			}
			return matchedPlayers;
		}		
		let player = matchPlayer(this.props.sendName, this.props.sendProjected);
		console.log(player);
		function matchStats (stat, projected_stats) {
			for (let i in projected_stats) {   
        		if (projected_stats[i].Player.indexOf(stat) != -1) {
            		return projected_stats[i];
        		}
			}
		}
		let stats = matchStats(this.props.sendName, this.props.sendProjected);
		console.log(stats.FPTS);
		console.log(this.props.sendPoints);
		return (
			player.length > 0 && this.props.sendPoints > stats.FPTS ?
				<div className="stats_icon">											       
	            	<h4 className="card-text"><img src="https://upload.wikimedia.org/wikipedia/commons/8/81/Simpleicons_Business_rising-bar-graph-with-arrow-up.svg" alt="graph going up" className="better_projection"/><b>Better than projected!</b></h4>
	            </div>	
	     			:
	        	<div className="stats_icon">	
					<h4 className="card-text"><img src="https://upload.wikimedia.org/wikipedia/commons/9/97/Octicons-arrow-down.svg" alt="arrow down" className="worse_projection"/><b>Worse than projected.</b></h4>
				</div>					   					   						               
		)
	}
}

export class SmallPlayerStats extends Component {
	constructor(props) {
		super(props);
		this.state = {error: null, isLoaded: false, stats: ''};		
	}

	componentDidMount() {
		fetch ('http://api.fantasy.nfl.com/v1/players/stats?statType=seasonStats&season=2017&week=1&format=json')
		.then(results => {
			return results.json();
		}).then((data) => {
				console.log(data);
				this.setState({isLoaded: true, stats: data.players});
			},
			(error) => {
				this.setState({isLoaded: true, error});
			}
		)
	}

	render() {
		const {error, isLoaded, stats} = this.state;

		if (error) {
			 return <p>Error: {error.message}</p>;
    	} 
    	else if (!isLoaded) {
      		return <p>Loading Stats...</p>;
    	} 
    	else {
    		return (
    			stats.map((player) => {
					if (player.name == this.props.sendPlayer.name && player.position == 'QB') {
						return (
							<div key={player.id}>
								<span><b>2017 Passing Stats:</b> 
								<br />
								Passing Yards: {player.stats[5]}, Passing TDs: {player.stats[6]}, Interceptions: {player.stats[7]}</span>
								<br />

								<span><b>2017 Rushing Stats: <br />
								</b> Rushing Yards: {player.stats[14]}, </span> 

								{player.stats[15] ? <span>Rushing TDs: {player.stats[15]}, </span> : <span>Running TDs: 0, </span>} 
								{player.stats[31] ? <span>Fumbles: {player.stats[31]}</span> : <span>Fumbles: 0</span>}						
							</div> 
						)
					}
					else if (player.name == this.props.sendPlayer.name && player.position == 'RB') {
						return (
							<div key={player.id}>
								<span><b>2017 Rushing Stats:</b>
								<br />
								Rushing Yards: {player.stats[14]}, </span>
								{player.stats[15] ? <span>Rushing TDs: {player.stats[15]}, </span> : <span>Rushing TDs: 0, </span>}
								{player.stats[31] ? <span>Fumbles: {player.stats[31]}</span> : <span>Fumbles: 0</span>}
								<br />

								<span><b>2017 Receiving Stats:</b></span> 
								<br />

								{player.stats[21] ? <span>Receiving Yards: {player.stats[21]}, </span> : <span>Receiving Yards: 0, </span>}
								{player.stats[22] ? <span>Receiving TDs: {player.stats[22]}</span> : <span>Receiving TDs: 0</span>}
							</div>
						)
					}
					else if (player.name == this.props.sendPlayer.name && player.position == 'WR' && player.id != 2559368) {
						return (
							<div key={player.id}>
								<span><b>2017 Receiving Stats:</b> 
								<br />
								 Receiving Yards: {player.stats[21]}, </span>
								{player.stats[22] ? <span>Receiving TDs: {player.stats[22]}, </span> : <span>Receiving TDs: 0, </span>}
								{player.stats[31] ? <span>Fumbles: {player.stats[31]}</span> : <span>Fumbles: 0</span>}	
							</div>
						)
					}
					else if (player.name == this.props.sendPlayer.name && player.position == 'TE') {
						return (
							<div key={player.id}>
								<span><b>2017 Receiving Stats:</b> 
								<br />
								Receiving Yards: {player.stats[21]}, </span>
								{player.stats[22] ? <span>Receiving TDs: {player.stats[22]}, </span> : <span>Receiving TDs: 0, </span>}
								{player.stats[31] ? <span>Fumbles: {player.stats[31]}</span> : <span>Fumbles: 0</span>}	
							</div>
						)
					}
				})
    		)
		}
	}			
}

