import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Projected_Stats } from '../api/projected_stats.js';

class PlayerPageProjections extends Component {
	render() {
		return (
			this.props.projected_stats.map((projected_stat) => {
				if (projected_stat.Player == this.props.sendPlayer.name && projected_stat['PASS YDS']) {
					return (
						<div key={projected_stat._id}>
							<p><b>2017 Projected Passing Stats: </b> Passing Yards: {projected_stat['PASS YDS'].toFixed()}, Passing TDs: {projected_stat['PASS TDS'].toFixed()}, Interceptions: {projected_stat.INTS.toFixed()}</p>
							<p><b>2017 Projected Rushing Stats: </b> Rushing Yards: {projected_stat['RUSH YDS'].toFixed()}, Rushing TDs: {projected_stat['RUSH TDS'].toFixed()}, Fumbles: {projected_stat.FL.toFixed()}</p> 					
						</div> 					
					)
				}
				else if (projected_stat.Player == this.props.sendPlayer.name && projected_stat.YDS && projected_stat['REC YDS']) {
					return (
						<div key={projected_stat._id}>
							<p><b>2017 Projected Rushing Stats: </b> Rushing Yards: {projected_stat.YDS.toFixed()}, Rushing TDs: {projected_stat.TDS.toFixed()}, Fumbles: {projected_stat.FL.toFixed()}</p>
							<p><b>2017 Projected Receiving Stats: </b> Receiving Yards: {projected_stat['REC YDS'].toFixed()}, Receiving TDs: {projected_stat['REC TDS'].toFixed()}</p>
						</div> 					
					)
				}
				else if (projected_stat.Player == this.props.sendPlayer.name && projected_stat.YDS && !projected_stat['REC YDS']) {
					return (
						<div key={projected_stat._id}>
							<p><b>2017 Projected Receiving Stats: </b> Receiving Yards: {projected_stat.YDS.toFixed()}, Receiving TDs: {projected_stat.TDS.toFixed()}, Fumbles: {projected_stat.FL.toFixed()}</p>
						</div> 					
					)
				}				
			})					
		)
	}
}

export default PlayerPageProjectionsContainer = withTracker(() => {
  const stats_subscription = Meteor.subscribe('projected_stats');  
  const projected_stats = Projected_Stats.find({}).fetch();	
  return {
  	projected_stats
  };
})(PlayerPageProjections);