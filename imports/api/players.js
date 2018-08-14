import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import './player_data.js';
 
export const Players = new Mongo.Collection('players');

if (Meteor.isServer) {
	Meteor.startup(() => {
	  // code to run on server at startup
	  if (!Players.findOne()) {
	  	for (let i=0; i<player_data.length; i++) {
	  		Players.insert(player_data[i]);
	  	};
	  };
	  console.log("Startup server says: " + Players.find().count() + " players.");
	});
	Meteor.publish('players', function playersPublication() {
    	return Players.find();
  	});
};