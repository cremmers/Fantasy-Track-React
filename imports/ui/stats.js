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
		fetch ('http://api.fantasy.nfl.com/v1/players/stats?statType=seasonStats&season=2018&week=1&format=json')
		.then(results => {
			return results.json();
		}).then((data) => {
				// console.log(data);
				this.setState({isLoaded: true, stats: data.players});
				// console.log(this.state);
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
								<p><b>2018 Passing Stats: </b> Passing Yards: {player.stats[5]}, Passing TDs: {player.stats[6]}, </p>
								{player.stats[7] ? <p>Interceptions: {player.stats[7]}</p> : <p>Interceptions: 0</p>}
								<br />
								<p><b>2018 Rushing Stats: </b></p>

								{player.stats[14] ? <p>Rushing Yards: {player.stats[14]}, </p> : <p>Rushing Yards: 0, </p>}
								{player.stats[15] ? <p>Rushing TDs: {player.stats[15]}, </p> : <p>Rushing TDs: 0, </p>} 
								{player.stats[31] ? <p>Fumbles: {player.stats[31]}</p> : <p>Fumbles: 0</p>}						
							</div> 
						)
					}
					else if (player.name == this.props.sendPlayer.name && player.position == 'RB') {
						return (
							<div key={player.id}>
								<p><b>2018 Rushing Stats: </b> Rushing Yards: {player.stats[14]}, </p>
								{player.stats[15] ? <p>Rushing TDs: {player.stats[15]}, </p> : <p>Rushing TDs: 0, </p>}
								{player.stats[31] ? <p>Fumbles: {player.stats[31]}</p> : <p>Fumbles: 0</p>}
								<br />
								<p><b>2018 Receiving Stats: </b></p>
								{player.stats[21] ? <p>Receiving Yards: {player.stats[21]}, </p> : <p>Receiving Yards: 0, </p>}
								{player.stats[22] ? <p>Receiving TDs: {player.stats[22]}</p> : <p>Receiving TDs: 0</p>}
							</div>
						)
					}
					else if (player.name == this.props.sendPlayer.name && player.position == 'WR' && player.id != 2559368) {
						return (
							<div key={player.id}>
								<p><b>2018 Receiving Stats: </b> Receiving Yards: {player.stats[21]}, </p>
								{player.stats[22] ? <p>Receiving TDs: {player.stats[22]}, </p> : <p>Receiving TDs: 0, </p>}
								{player.stats[31] ? <p>Fumbles: {player.stats[31]}</p> : <p>Fumbles: 0</p>}	
							</div>
						)
					}
					else if (player.name == this.props.sendPlayer.name && player.position == 'TE') {
						return (
							<div key={player.id}>
								<p><b>2018 Receiving Stats: </b> Receiving Yards: {player.stats[21]}, </p>
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
		this.state = {error: null, isLoaded: false, stats: '', week: 0, passing_yds: 0, qb_pts: 0, rushing_receiving_yds: 0, rb_pts: 0, wr_pts: 0, te_pts: 0, weekly_multiplier: 0};		
	}

	componentDidMount() {
		fetch ('http://api.fantasy.nfl.com/v1/players/stats?statType=seasonStats&season=2018&week=1&format=json')
		.then(results => {
			return results.json();
		}).then((data) => {
				this.setState({isLoaded: true, stats: data.players});
			},
			(error) => {
				this.setState({isLoaded: true, error});
			}
		)
		let date = new Date();
		if (date.getMonth() == 8 && date.getDate() >= 6 && date.getDate() <= 15) {
			this.setState({week: 1});
			this.setState({passing_yds: 266});
			this.setState({qb_pts: 30});
			this.setState({rushing_receiving_yds: 66});
			this.setState({rb_pts: 7});
			this.setState({wr_pts: 9});
			this.setState({te_pts: 6});
			this.setState({weekly_multiplier: 15});
		}
		else if (date.getMonth() == 8 && date.getDate() >= 16 && date.getDate() >= 22) {
			this.setState({week: 2});
			this.setState({passing_yds: 266});
			this.setState({qb_pts: 30});
			this.setState({rushing_receiving_yds: 66});
			this.setState({rb_pts: 7});
			this.setState({wr_pts: 9});
			this.setState({te_pts: 6});
			this.setState({weekly_multiplier: 7.5});
		}
		else if (date.getMonth() == 8 && date.getDate() >= 23 && date.getDate() <= 29) {
			this.setState({week: 3});
			this.setState({passing_yds: 532});
			this.setState({qb_pts: 45});
			this.setState({rushing_receiving_yds: 132});
			this.setState({rb_pts: 14});
			this.setState({wr_pts: 18});
			this.setState({te_pts: 12});
			this.setState({weekly_multiplier: 5});
		}
		else if (date.getMonth() == 8 && date.getDate() >= 30) {
			this.setState({week: 4});
			this.setState({passing_yds: 798});
			this.setState({qb_pts: 60});
			this.setState({rushing_receiving_yds: 198});
			this.setState({rb_pts: 21});
			this.setState({wr_pts: 27});
			this.setState({te_pts: 18});
			this.setState({weekly_multiplier: 3.75});
		}
		else if (date.getMonth() == 9 && date.getDate() <= 6) {
			this.setState({week: 4});
			this.setState({passing_yds: 798});
			this.setState({qb_pts: 60});
			this.setState({rushing_receiving_yds: 198});
			this.setState({rb_pts: 21});
			this.setState({wr_pts: 27});
			this.setState({te_pts: 18});
			this.setState({weekly_multiplier: 3.75});
		}  			
		else if (date.getMonth() == 9 && date.getDate() >= 7 && date.getDate() <= 13) {
			this.setState({week: 5});
			this.setState({passing_yds: 1064});
			this.setState({qb_pts: 75});
			this.setState({rushing_receiving_yds: 264});
			this.setState({rb_pts: 28});
			this.setState({wr_pts: 36});
			this.setState({te_pts: 24});
			this.setState({weekly_multiplier: 3});
		}
		else if (date.getMonth() == 9 && date.getDate() >= 14 && date.getDate() <= 20) {
			this.setState({week: 6});
			this.setState({passing_yds: 1330});
			this.setState({qb_pts: 90});
			this.setState({rushing_receiving_yds: 330});
			this.setState({rb_pts: 35});
			this.setState({wr_pts: 45});
			this.setState({te_pts: 30});
			this.setState({weekly_multiplier: 2.5});
		} 			
		else if (date.getMonth() == 9 && date.getDate() >= 21 && date.getDate() <= 27) {
			this.setState({week: 7});
			this.setState({passing_yds: 1596});
			this.setState({qb_pts: 105});
			this.setState({rushing_receiving_yds: 396});
			this.setState({rb_pts: 42});
			this.setState({wr_pts: 54});
			this.setState({te_pts: 36});
			this.setState({weekly_multiplier: 2.1});
		}
		else if (date.getMonth() == 9 && date.getDate() >= 28) {
			this.setState({week: 8});
			this.setState({passing_yds: 1862});
			this.setState({qb_pts: 120});
			this.setState({rushing_receiving_yds: 462});
			this.setState({rb_pts: 49});
			this.setState({wr_pts: 63});
			this.setState({te_pts: 42});
			this.setState({weekly_multiplier: 1.9});
		}
		else if (date.getMonth() == 10 && date.getDate() <= 3) {
			this.setState({week: 8});
			this.setState({passing_yds: 1862});
			this.setState({qb_pts: 120});
			this.setState({rushing_receiving_yds: 462});
			this.setState({rb_pts: 49});
			this.setState({wr_pts: 63});
			this.setState({te_pts: 42});
			this.setState({weekly_multiplier: 1.9});
		}
		else if (date.getMonth() == 10 && date.getDate() >= 4 && date.getDate() <= 10) {
			this.setState({week: 9});
			this.setState({passing_yds: 2129});
			this.setState({qb_pts: 135});
			this.setState({rushing_receiving_yds: 529});
			this.setState({rb_pts: 56});
			this.setState({wr_pts: 72});
			this.setState({te_pts: 48});
			this.setState({weekly_multiplier: 1.7});
		}
		else if (date.getMonth() == 10 && date.getDate() >= 11 && date.getDate() <= 17) {
			this.setState({week: 10});
			this.setState({passing_yds: 2396});
			this.setState({qb_pts: 150});
			this.setState({rushing_receiving_yds: 596});
			this.setState({rb_pts: 62});
			this.setState({wr_pts: 81});
			this.setState({te_pts: 54});
			this.setState({weekly_multiplier: 1.5});
		}
		else if (date.getMonth() == 10 && date.getDate() >= 18 && date.getDate() <= 24) {
			this.setState({week: 11});
			this.setState({passing_yds: 2662});
			this.setState({qb_pts: 165});
			this.setState({rushing_receiving_yds: 663});
			this.setState({rb_pts: 68});
			this.setState({wr_pts: 90});
			this.setState({te_pts: 60});
			this.setState({weekly_multiplier: 1.3});
		}
		else if (date.getMonth() == 10 && date.getDate() >= 25 && date.getDate() <= 30) {
			this.setState({week: 12});
			this.setState({passing_yds: 2928});
			this.setState({qb_pts: 180});
			this.setState({rushing_receiving_yds: 730});
			this.setState({rb_pts: 74});
			this.setState({wr_pts: 99});
			this.setState({te_pts: 66});
			this.setState({weekly_multiplier: 1.1});
		}
		else if (date.getMonth() == 11 && date.getDate() <= 1) {
			this.setState({week: 12});
			this.setState({passing_yds: 2928});
			this.setState({qb_pts: 180});
			this.setState({rushing_receiving_yds: 730});
			this.setState({rb_pts: 74});
			this.setState({wr_pts: 99});
			this.setState({te_pts: 66});
			this.setState({weekly_multiplier: 1.1});
		}
		else if (date.getMonth() == 11 && date.getDate() >= 2 && date.getDate() <= 8) {
			this.setState({week: 13});
			this.setState({passing_yds: 3194});
			this.setState({qb_pts: 195});
			this.setState({rushing_receiving_yds: 797});
			this.setState({rb_pts: 80});
			this.setState({wr_pts: 108});
			this.setState({te_pts: 72});
			this.setState({weekly_multiplier: 0.9});
		}
		else if (date.getMonth() == 11 && date.getDate() >= 9 && date.getDate() <= 15) {
			this.setState({week: 14});
			this.setState({passing_yds: 3460});
			this.setState({qb_pts: 205});
			this.setState({rushing_receiving_yds: 864});
			this.setState({rb_pts: 86});
			this.setState({wr_pts: 117});
			this.setState({te_pts: 78});
			this.setState({weekly_multiplier: 0.7});
		}
		else if (date.getMonth() == 11 && date.getDate() >= 16 && date.getDate() <= 22) {
			this.setState({week: 15});
			this.setState({passing_yds: 3726});
			this.setState({qb_pts: 220});
			this.setState({rushing_receiving_yds: 931});
			this.setState({rb_pts: 92});
			this.setState({wr_pts: 126});
			this.setState({te_pts: 86});
			this.setState({weekly_multiplier: 0.5});
		}
		else if (date.getMonth() == 11 && date.getDate() >= 23 && date.getDate() <= 29) {
			this.setState({week: 16});
			this.setState({passing_yds: 4000});
			this.setState({qb_pts: 235});
			this.setState({rushing_receiving_yds: 1000});
			this.setState({rb_pts: 98});
			this.setState({wr_pts: 135});
			this.setState({te_pts: 92});
			this.setState({weekly_multiplier: 0.3});
		}
		else {
			this.setState({week: 16});
			this.setState({passing_yds: 4000});
			this.setState({qb_pts: 235});
			this.setState({rushing_receiving_yds: 1000});
			this.setState({rb_pts: 98});
			this.setState({wr_pts: 135});
			this.setState({te_pts: 92});
			this.setState({weekly_multiplier: 0.3});
		} 			 	 			 	  	  			 	  	 			 	  	 			 	  	 			 	  		 			 	  			 	  			 	 	 			 	 			 			
	}

	render() {
		let projected_stats = this.props.sendProjections;
		
		const {error, isLoaded, stats, week, passing_yds, qb_pts, rushing_receiving_yds, rb_pts, wr_pts, te_pts, weekly_multiplier} = this.state;

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
									<h4><span className="card-text"><b>2018 Passing Stats (Through Week {week}): </b> Passing Yards: {player.stats[5]}, Passing TDs: {player.stats[6]}, </span>
									{player.stats[7] ? <span>Interceptions: {player.stats[7]}</span> : <span>Interceptions: 0</span>}</h4>
					
									<span className="card-text"><b>2018 Rushing Stats (Through Week {week}): </b></span>
									{player.stats[14] ? <span className="card-text">Rushing Yards: {player.stats[14]}, </span> : <span className="card-text">Rushing Yards: 0, </span>} 							
									{player.stats[15] ? <span className="card-text">Rushing TDs: {player.stats[15]}, </span> : <span className="card-text">Rushing TDs: 0, </span>} 
									{player.stats[31] ? <span className="card-text">Fumbles: {player.stats[31]}</span> : <span className="card-text">Fumbles: 0</span>}	
								</div>							
								<br />								  
            					{player.stats[5] >= passing_yds ? <div className="stats_icon"><h4 className="card-text"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/AmFBfield.svg" alt="football field" className="good_year"/><b>4000 yard passing pace!</b></h4></div> : null }	        					
	        					<CheckProjected sendName={player.name} sendPoints={player.seasonPts} sendProjected={projected_stats} sendMultiplier={weekly_multiplier} />
	        					
						        <div className="stats_icon"> 
						            {player.seasonPts > qb_pts ? <h4 className="card-text"><img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/American_football_icon.svg" alt="football helmet" className="starter"/><b>Starter</b></h4> : <h4 className="card-text"><img src="https://upload.wikimedia.org/wikipedia/commons/1/1c/ClipboardClipart.svg" alt="clipboard" className="bench_player"/><b>Bench Player</b></h4>}
						        </div>	               
						    </div> 
						)
					}
					else if (player.name == this.props.sendPlayer.name && player.position == 'RB') {
						let combined_yards = Number(player.stats[14]) + Number(player.stats[21]);
						return (
							<div key={player.id}>
								<div>
									<h4><span className="card-text"><b>2018 Rushing Stats (Through Week {week}): </b> Rushing Yards: {player.stats[14]}, </span>
									{player.stats[15] ? <span className="card-text">Rushing TDs: {player.stats[15]}, </span> : <span className="card-text">Rushing TDs: 0, </span>}
									{player.stats[31] ? <span className="card-text">Fumbles: {player.stats[31]}</span> : <span className="card-text">Fumbles: 0</span>}</h4>

									<span className="card-text"><b>2018 Receiving Stats (Through Week {week}): </b></span> 
									{player.stats[21] ? <span className="card-text">Receiving Yards: {player.stats[21]}, </span> : <span className="card-text">Receiving Yards: 0, </span>} 
									{player.stats[22] ? <span className="card-text">Receiving TDs: {player.stats[22]}</span> : <span className="card-text">Receiving TDs: 0</span>}
								</div>
								<br />							
									{player.stats[14] >= rushing_receiving_yds ? <div className="stats_icon"><h4 className="card-text"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/AmFBfield.svg" alt="football field" className="good_year"/><b>1000 yard rushing pace!</b></h4></div> : null }																							
									{combined_yards >= rushing_receiving_yds ? <div className="stats_icon"><h4 className="card-text"><img src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Football_Icon.svg" alt="football" className="good_year"/><b>1000 combined yards pace!</b></h4></div> : null }																
								<CheckProjected sendName={player.name} sendPoints={player.seasonPts} sendProjected={projected_stats} sendMultiplier={weekly_multiplier} />
								
						        <div className="stats_icon"> 
						            {player.seasonPts > rb_pts ? <h4 className="card-text"><img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/American_football_icon.svg" alt="football helmet" className="starter"/><b>Starter</b></h4> : <h4 className="card-text"><img src="https://upload.wikimedia.org/wikipedia/commons/1/1c/ClipboardClipart.svg" alt="clipboard" className="bench_player"/><b>Bench Player</b></h4>}
						        </div>	         
							</div>
						)
					}
					else if (player.name == this.props.sendPlayer.name && player.position == 'WR' && player.id != 2559368) {
						return (
							<div key={player.id}>
								<h4><span className="card-text"><b>2018 Receiving Stats (Through Week {week}): </b> Receiving Yards: {player.stats[21]}, </span>
								{player.stats[22] ? <span className="card-text">Receiving TDs: {player.stats[22]}, </span> : <span className="card-text">Receiving TDs: 0, </span>}
								{player.stats[31] ? <span className="card-text">Fumbles: {player.stats[31]}</span> : <span className="card-text">Fumbles: 0</span>}</h4>
								<br />								
									{player.stats[21] >= rushing_receiving_yds ? <div className="stats_icon"><h4 className="card-text"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/AmFBfield.svg" alt="football field" className="good_year"/><b>1000 yard receiving pace!</b></h4></div> : null }								
				               	<CheckProjected sendName={player.name} sendPoints={player.seasonPts} sendProjected={projected_stats} sendMultiplier={weekly_multiplier} />
				               					 
						        <div className="stats_icon"> 
						            {player.seasonPts > wr_pts ? <h4 className="card-text"><img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/American_football_icon.svg" alt="football helmet" className="starter"/><b>Starter</b></h4> : <h4 className="card-text"><img src="https://upload.wikimedia.org/wikipedia/commons/1/1c/ClipboardClipart.svg" alt="clipboard" className="bench_player"/><b>Bench Player</b></h4>}
						        </div>	         
							</div>
						)
					}
					else if (player.name == this.props.sendPlayer.name && player.position == 'TE') {
						return (
							<div key={player.id}>
								<h4><span className="card-text"><b>2018 Receiving Stats (Through Week {week}): </b> Receiving Yards: {player.stats[21]}, </span>
								{player.stats[22] ? <span className="card-text">Receiving TDs: {player.stats[22]}, </span> : <span className="card-text">Receiving TDs: 0, </span>}
								{player.stats[31] ? <span className="card-text">Fumbles: {player.stats[31]}</span> : <span className="card-text">Fumbles: 0</span>}</h4>
								<br />								
									{player.stats[21] >= rushing_receiving_yds ? <div className="stats_icon"><h4 className="card-text"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/AmFBfield.svg" alt="football field" className="good_year"/><b>1000 yard receiving pace!</b></h4></div> : null }								
								<CheckProjected sendName={player.name} sendPoints={player.seasonPts} sendProjected={projected_stats} sendMultiplier={weekly_multiplier} />
								
						        <div className="stats_icon"> 
						            {player.seasonPts > te_pts ? <h4 className="card-text"><img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/American_football_icon.svg" alt="football helmet" className="starter"/><b>Starter</b></h4> : <h4 className="card-text"><img src="https://upload.wikimedia.org/wikipedia/commons/1/1c/ClipboardClipart.svg" alt="clipboard" className="bench_player"/><b>Bench Player</b></h4>}
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
		// console.log(player);
		function matchStats (stat, projected_stats) {
			for (let i in projected_stats) {   
        		if (projected_stats[i].Player.indexOf(stat) != -1) {
            		return projected_stats[i];
        		}
			}
		}
		let stats = matchStats(this.props.sendName, this.props.sendProjected);
		// console.log(stats.FPTS);
		// console.log(this.props.sendPoints);
		// console.log(this.props.sendMultiplier);
		return (
			player.length > 0 && this.props.sendPoints * this.props.sendMultiplier >= stats.FPTS ?
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
		fetch ('http://api.fantasy.nfl.com/v1/players/stats?statType=seasonStats&season=2018&week=1&format=json')
		.then(results => {
			return results.json();
		}).then((data) => {
				// console.log(data);
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
								<span><b>2018 Passing Stats:</b> 
								<br />
								Passing Yards: {player.stats[5]}, Passing TDs: {player.stats[6]}, </span>
								{player.stats[7] ? <span>Interceptions: {player.stats[7]}</span> : <span>Interceptions: 0</span>}
								<br />

								<span><b>2018 Rushing Stats:</b></span>
								<br />
								
								{player.stats[14] ? <span>Rushing Yards: {player.stats[14]}, </span> : <span>Rushing Yards: 0, </span>}
								{player.stats[15] ? <span>Rushing TDs: {player.stats[15]}, </span> : <span>Rushing TDs: 0, </span>} 
								{player.stats[31] ? <span>Fumbles: {player.stats[31]}</span> : <span>Fumbles: 0</span>}						
							</div> 
						)
					}
					else if (player.name == this.props.sendPlayer.name && player.position == 'RB') {
						return (
							<div key={player.id}>
								<span><b>2018 Rushing Stats:</b>
								<br />
								Rushing Yards: {player.stats[14]}, </span>
								{player.stats[15] ? <span>Rushing TDs: {player.stats[15]}, </span> : <span>Rushing TDs: 0, </span>}
								{player.stats[31] ? <span>Fumbles: {player.stats[31]}</span> : <span>Fumbles: 0</span>}
								<br />

								<span><b>2018 Receiving Stats:</b></span> 
								<br />

								{player.stats[21] ? <span>Receiving Yards: {player.stats[21]}, </span> : <span>Receiving Yards: 0, </span>}
								{player.stats[22] ? <span>Receiving TDs: {player.stats[22]}</span> : <span>Receiving TDs: 0</span>}
							</div>
						)
					}
					else if (player.name == this.props.sendPlayer.name && player.position == 'WR' && player.id != 2559368) {
						return (
							<div key={player.id}>
								<span><b>2018 Receiving Stats:</b> 
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
								<span><b>2018 Receiving Stats:</b> 
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

