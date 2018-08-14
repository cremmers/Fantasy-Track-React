import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import './qb_stats.js';
import './rb_stats.js';
import './wr_stats.js';
import './te_stats.js';

export const Projected_Stats = new Mongo.Collection('projected_stats');

if (Meteor.isServer){

	Meteor.startup(function() {
	  // code to run on server at startup
	  if (!Projected_Stats.findOne()) {
	  	for (let i=0; i<qb_stats.length; i++) {
	  		Projected_Stats.insert(qb_stats[i]);
	  	};
	  	for (let i=0; i<rb_stats.length; i++) {
	  		Projected_Stats.insert(rb_stats[i]);
	  	};
	  	for (let i=0; i<wr_stats.length; i++) {
	  		Projected_Stats.insert(wr_stats[i]);
	  	};
	  	for (let i=0; i<te_stats.length; i++) {
	  		Projected_Stats.insert(te_stats[i]);
	  	};
	  };
	  console.log("Startup server says: " + Projected_Stats.find().count() + " projected player stats.");
	});

	Meteor.publish('projected_stats', function statsPublication(){
		return Projected_Stats.find();
	});
};