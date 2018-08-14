import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Teams = new Mongo.Collection('teams');

if (Meteor.isServer) {
	console.log('Server here!');	
	Meteor.publish('teams', function teamsPublication() {
		const currentUserId = Meteor.userId();
    	return Teams.find({createdBy: currentUserId});
  	});	
}

Meteor.methods({
	'teams.insert' (addedTeam) {
		// get user ID and search collection for a team name that was already chosen by that user		
		const currentUserId = Meteor.userId();
		let name_array = (Teams.find({'name': addedTeam.name, 'createdBy': currentUserId})).fetch();

		// check to see if team name already exists, otherwise send back an error
		if ((name_array.length == 0)) {
			if (Meteor.userId()) {
				let team_id = Teams.insert(addedTeam);
				console.log("Added team with id:" + team_id);
				let new_team = Teams.findOne({'_id': team_id});
				return new_team;
			}
		}
		else if (name_array.length != 0)  {
			throw new Meteor.Error("Duplicate team found.", "A duplicate team name was found.");
		}
	},

	'teams.update' (selectedTeam, updatedTeam) {
		// check to see if changes were made, then update team		
		let selectedTeamArray = selectedTeam.players;
		let updatedTeamArray = updatedTeam.players;

		function teamDifference (selectedTeamArray, updatedTeamArray) {
			let updatedTeamNames = [];
			for (let i in updatedTeamArray) {   
        		if (selectedTeamArray[i].name.indexOf(updatedTeamArray[i].name) == -1) {
            		updatedTeamNames.push(updatedTeamArray[i].name);
        		}
			}
			console.log(updatedTeamNames);
			return updatedTeamNames;
		}
			
		console.log(teamDifference(selectedTeamArray, updatedTeamArray));

		if (teamDifference(selectedTeamArray, updatedTeamArray).length > 0) {	
			if (Meteor.userId()) {
				Teams.remove({_id: selectedTeam._id});
				let team_id = Teams.insert(updatedTeam);
				console.log("Updated team with id:" + team_id);
				let new_team = Teams.findOne({'_id': team_id});
				return new_team;
			}
		}
		else {
			throw new Meteor.Error("No update.", "No change was made to the loaded team.");				
		}			
	},

	'teams.delete' (loadedTeam) {
		// remove loaded team from the database
		Teams.remove({_id: loadedTeam._id});
	},

});