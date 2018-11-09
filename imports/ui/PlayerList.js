import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Players } from '../api/players.js';

import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
 
class PlayerList extends Component {
  constructor(props) {
 	  super(props);

 	  this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) { 
  	event.preventDefault();

    // get player that was clicked on
	  let player = event.currentTarget.innerHTML;
    let player_name = event.currentTarget.innerHTML;
    console.log(player);

    // show alert when a duplicate player is chosen
    if (document.getElementById('p-1').innerHTML.indexOf(player_name) != -1) {
      Alert.error('Duplicate players are not allowed.', {stack: true, effect: 'slide', offset: 100});
    }
    if (document.getElementById('p-2').innerHTML.indexOf(player_name) != -1) {
      Alert.error('Duplicate players are not allowed.', {stack: true, effect: 'slide', offset: 100});
    }
    if (document.getElementById('p-3').innerHTML.indexOf(player_name) != -1) {
      Alert.error('Duplicate players are not allowed.', {stack: true, effect: 'slide', offset: 100});
    }
    if (document.getElementById('p-4').innerHTML.indexOf(player_name) != -1) {
      Alert.error('Duplicate players are not allowed.', {stack: true, effect: 'slide', offset: 100});
    }
    if (document.getElementById('p-5').innerHTML.indexOf(player_name) != -1) {
      Alert.error('Duplicate players are not allowed.', {stack: true, effect: 'slide', offset: 100});
    }
    if (document.getElementById('p-6').innerHTML.indexOf(player_name) != -1) {
      Alert.error('Duplicate players are not allowed.', {stack: true, effect: 'slide', offset: 100});
    }
    if (document.getElementById('p-7').innerHTML.indexOf(player_name) != -1) {
      Alert.error('Duplicate players are not allowed.', {stack: true, effect: 'slide', offset: 100});
    }
    
	  if (player.indexOf('- QB') != -1 && !document.getElementById('p-1').innerHTML.includes('- QB')) {
      // copy player into slot in table
      document.getElementById('p-1').innerHTML = player;

      // create delete button and attach to QB
      let delete_player = document.createElement('button');
      let x = document.createTextNode('x');
      delete_player.appendChild(x);
      document.getElementById('p-1').appendChild(delete_player);
      delete_player.setAttribute('id', 'p1-del');
      delete_player.setAttribute('class','delete_player');

      // recereate empty table slot
      document.getElementById('p1-del').onclick = function() {
        let empty_player = document.createElement('li');
        let p = document.createElement('p');
        let QB = document.createTextNode('QB');
        p.appendChild(QB);
        empty_player.appendChild(p);
        empty_player.setAttribute('class','list-group-item');
        empty_player.setAttribute('id','p-1');
        console.log(empty_player);
        let current_player = document.getElementById('p-1');
        console.log(current_player); 
        document.getElementById('p-1').parentNode.replaceChild(empty_player, current_player);
      }
    }

    else if (player.indexOf('- RB') != -1 && document.getElementById('p-2').innerHTML.includes('RB1') && document.getElementById('p-3').innerHTML.indexOf(player_name) == -1 && document.getElementById('p-6').innerHTML.indexOf(player_name) == -1) {
      // copy player into slot in table
      document.getElementById('p-2').innerHTML = player;

      // create delete button and attach to RB
      let delete_player = document.createElement('button');
      let x = document.createTextNode('x');
      delete_player.appendChild(x);
      document.getElementById('p-2').appendChild(delete_player);
      delete_player.setAttribute('id', 'p2-del');
      delete_player.setAttribute('class','delete_player');

      // recereate empty table slot
      document.getElementById('p2-del').onclick = function() {
        let empty_player = document.createElement('li');
        let p = document.createElement('p');
        let RB = document.createTextNode('RB1');
        p.appendChild(RB);
        empty_player.appendChild(p);
        empty_player.setAttribute('class','list-group-item');
        empty_player.setAttribute('id','p-2');
        let current_player = document.getElementById('p-2');
        document.getElementById('p-2').parentNode.replaceChild(empty_player, current_player);
      }
    } 

    else if (player.indexOf('- RB') != -1 && document.getElementById('p-3').innerHTML.includes('RB2') && document.getElementById('p-2').innerHTML.indexOf(player_name) == -1 && document.getElementById('p-6').innerHTML.indexOf(player_name) == -1) {
      // copy player into slot in table
      document.getElementById('p-3').innerHTML = player;

      // create delete button and attach to RB
      let delete_player = document.createElement('button');
      let x = document.createTextNode('x');
      delete_player.appendChild(x);
      document.getElementById('p-3').appendChild(delete_player);
      delete_player.setAttribute('id', 'p3-del');
      delete_player.setAttribute('class','delete_player');

      // recereate empty table slot
      document.getElementById('p3-del').onclick = function() {
        let empty_player = document.createElement('li');
        let p = document.createElement('p');
        let RB = document.createTextNode('RB2');
        p.appendChild(RB);
        empty_player.appendChild(p);
        empty_player.setAttribute('class','list-group-item');
        empty_player.setAttribute('id','p-3');
        console.log(empty_player);
        let current_player = document.getElementById('p-3');
        console.log(current_player); 
        document.getElementById('p-3').parentNode.replaceChild(empty_player, current_player);
      }
    }

    else if (player.indexOf('- WR') != -1 && document.getElementById('p-4').innerHTML.includes('WR1') && document.getElementById('p-5').innerHTML.indexOf(player_name) == -1 && document.getElementById('p-6').innerHTML.indexOf(player_name) == -1) {
      // copy player into slot in table
      document.getElementById('p-4').innerHTML = player;

      // create delete button and attach to WR
      let delete_player = document.createElement('button');
      let x = document.createTextNode('x');
      delete_player.appendChild(x);
      document.getElementById('p-4').appendChild(delete_player);
      delete_player.setAttribute('id', 'p4-del');
      delete_player.setAttribute('class','delete_player');

      // recereate empty table slot
      document.getElementById('p4-del').onclick = function() {
        let empty_player = document.createElement('li');
        let p = document.createElement('p');
        let WR = document.createTextNode('WR1');
        p.appendChild(WR);
        empty_player.appendChild(p);
        empty_player.setAttribute('class','list-group-item');
        empty_player.setAttribute('id','p-4');
        console.log(empty_player);
        let current_player = document.getElementById('p-4');
        console.log(current_player); 
        document.getElementById('p-4').parentNode.replaceChild(empty_player, current_player);
      }
    }

    else if (player.indexOf('- WR') != -1 && document.getElementById('p-5').innerHTML.includes('WR2') && document.getElementById('p-4').innerHTML.indexOf(player_name) == -1 && document.getElementById('p-6').innerHTML.indexOf(player_name) == -1) {
      // copy player into slot in table
      document.getElementById('p-5').innerHTML = player;

      // create delete button and attach to WR
      let delete_player = document.createElement('button');
      let x = document.createTextNode('x');
      delete_player.appendChild(x);
      document.getElementById('p-5').appendChild(delete_player);
      delete_player.setAttribute('id', 'p5-del');
      delete_player.setAttribute('class','delete_player');

      // recereate empty table slot
      document.getElementById('p5-del').onclick = function() {
        let empty_player = document.createElement('li');
        let p = document.createElement('p');
        let WR = document.createTextNode('WR2');
        p.appendChild(WR);
        empty_player.appendChild(p);
        empty_player.setAttribute('class','list-group-item');
        empty_player.setAttribute('id','p-5');
        console.log(empty_player);
        let current_player = document.getElementById('p-5');
        console.log(current_player); 
        document.getElementById('p-5').parentNode.replaceChild(empty_player, current_player);
      }
    }

    else if (player.indexOf('- TE') != -1 && !document.getElementById('p-7').innerHTML.includes('- TE') && document.getElementById('p-6').innerHTML.indexOf(player_name) == -1) {
      // copy player into slot in table
      document.getElementById('p-7').innerHTML = player;

      // create delete button and attach to TE
      let delete_player = document.createElement('button');
      let x = document.createTextNode('x');
      delete_player.appendChild(x);
      document.getElementById('p-7').appendChild(delete_player);
      delete_player.setAttribute('id', 'p7-del');
      delete_player.setAttribute('class','delete_player');

      // recereate empty table slot
      document.getElementById('p7-del').onclick = function() {
        let empty_player = document.createElement('li');
        let p = document.createElement('p');
        let TE = document.createTextNode('TE');
        p.appendChild(TE);
        empty_player.appendChild(p);
        empty_player.setAttribute('class','list-group-item');
        empty_player.setAttribute('id','p-7');
        console.log(empty_player);
        let current_player = document.getElementById('p-7');
        console.log(current_player); 
        document.getElementById('p-7').parentNode.replaceChild(empty_player, current_player);
      }
    }            
            
    else if ((player.indexOf('- RB') != -1 || player.indexOf('- WR') != -1 || player.indexOf('- TE') != -1) && !document.getElementById('p-6').innerHTML.includes('- RB') && !document.getElementById('p-6').innerHTML.includes('- WR') && !document.getElementById('p-6').innerHTML.includes('- TE') && document.getElementById('p-2').innerHTML.indexOf(player_name) == -1 && document.getElementById('p-3').innerHTML.indexOf(player_name) == -1 && document.getElementById('p-4').innerHTML.indexOf(player_name) == -1 && document.getElementById('p-5').innerHTML.indexOf(player_name) == -1 && document.getElementById('p-7').innerHTML.indexOf(player_name) == -1) {
      // copy player into slot in table
      document.getElementById('p-6').innerHTML = player;

      // create delete button and attach to WRT
      let delete_player = document.createElement('button');
      let x = document.createTextNode('x');
      delete_player.appendChild(x);
      document.getElementById('p-6').appendChild(delete_player);
      delete_player.setAttribute('id', 'p6-del');
      delete_player.setAttribute('class','delete_player');

      // recereate empty table slot
      document.getElementById('p6-del').onclick = function() {
        let empty_player = document.createElement('li');
        let p = document.createElement('p');
        let WRT = document.createTextNode('W/R/T');
        p.appendChild(WRT);
        empty_player.appendChild(p);
        empty_player.setAttribute('class','list-group-item');
        empty_player.setAttribute('id','p-6');
        console.log(empty_player);
        let current_player = document.getElementById('p-6');
        console.log(current_player); 
        document.getElementById('p-6').parentNode.replaceChild(empty_player, current_player);
      }
    }
  }

  render() {
    return ( 
      <div>   	
    		{this.props.players.map(player => <a href="#" key={player._id}>
          <li className="list-group-item" onClick={this.handleClick}>          
    	      <img className="logo" src={player.logo} alt={player.alt} />
    	      <p id={player._id} className="selected_player"> {player.name}</p>
    	      <p> - {player.position}</p>
    	      <p> - {player.team} </p>
          </li>
          </a>)}
      </div>	
    )
  }
}

export class SearchPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {playerSearch: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();

    this.setState({playerSearch: event.target.value}, this.searchFunction);  
  }

  searchFunction() {
    // variables for saving search string and list items
    let filter = this.state.playerSearch.toUpperCase();
    let ul = document.getElementById('player_list');
    let li = ul.getElementsByTagName('li');

    // loop through all list items, and hide those who don't match the search query
    for (let i=0; i < li.length; i++) {
      let name = li[i].getElementsByTagName('p')[0];
      let position = li[i].getElementsByTagName('p')[1];
      let team = li[i].getElementsByTagName('p')[2];
      if (name.innerHTML.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
      }
      else if (position.innerHTML.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
      }
      else if (team.innerHTML.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
      }   
      else {
          li[i].style.display = "none";
      }
    }
  }

  render() {
    return ( 
      <div className="input-group">
          <span className="input-group-addon">
            <i className="glyphicon glyphicon-search"></i> 
          </span>
          <input type="text" name="playerSearch" className="form-control" onChange={this.handleChange} placeholder="Find a player by name, position, or team." />
      </div>
    )
  }        
}

export default PlayerListContainer = withTracker(() => {
  Meteor.subscribe('players');
  const players = Players.find({}).fetch(); 
  return {
    players
  };
})(PlayerList);