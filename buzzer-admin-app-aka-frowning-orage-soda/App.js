import React, { Component } from 'react';
import {
  Text,
  Button,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import db from './config';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      teamRank: [],
    };
  }
  componentDidMount() {
    this.teamStandings();
  }
  teamStandings = () => {
    var teamsThatAnswered = [];
    var teamRef = db.ref('teams/');
    teamRef.on('value', (data) => {
      var teams = data.val();
      for (var team in teams) {
        if (teams[team]['isButtonPressed'] == true) {
          teams[team]['teamName'] = team;
          teamsThatAnswered.push(teams[team]);
        }
      }
      teamsThatAnswered.sort(function (team1, team2) {
        return team1.time - team2.time;
      });
      this.setState({
        teamRank: teamsThatAnswered,
      });
      teamsThatAnswered = [];
    });
  };

  resetScores = () => {
    teamRef = db.ref('teams/');
    this.setState({
      teamRank: [],
    });
    teamRef.set({
      red: {
        isButtonPressed: false,
        time: 0,
        isEnabled: true
      },
      blue: {
        isButtonPressed: false,
        time: 0,
        isEnabled: true
      },
      green: {
        isButtonPressed: false,
        time: 0,
        isEnabled: true
      },
      yellow: {
        isButtonPressed: false,
        time: 0,
        isEnabled: true
      },
    });
  };
  render() {
    console.log(this.state.teamRank);
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Text
          style={{
            height: 50,
            textAlign: 'center',
            fontSize: 25,
            backgroundColor: 'blue',
            color: 'white',
            fontWeight: 'bold',
          }}>
          Quiz Buzzer App RESULTS
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {this.state.teamRank.map((team) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                margin: 5,
                width: 150,
                height: 50,
                backgroundColor: team.teamName,
              }}>
              <Text>{team.teamName.toUpperCase()}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.resetScores();
          }}>
          <Text>Reset</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
    width: 250,
    height: 100,
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 50,
    marginBottom: 150
  },
});
