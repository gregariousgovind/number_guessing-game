import React, { Component } from 'react';
import NavBar from './components/navBar';
import Games from './components/games'
import './App.css';

class App extends Component {
  state = { 
    games: [
      { level: 1, min: 1, max: 100, guesses: [], score: 0 }
    ]
  };

  handleLevelUp = game => {
    if (this.state.games.length === game.level){
      const newGame = {
        level: game.level + 1, 
        min: 1, 
        max: game.max + 100,
        guesses: [],
        score: 0
      }
      let games = [...this.state.games];
      games.push(newGame);
      this.setState({ games })
    }
  };

  handleGuesses = (game, guess) => {
    const games = [...this.state.games];
    const index = games.indexOf(game);
    games[index] = { ...game };
    games[index].guesses.push(guess)
    this.setState({ games });
  };

  handleScore = game => {
    const games = [...this.state.games];
    const index = games.indexOf(game);
    games[index] = { ...game };
    games[index].score = game.max - game.guesses.length;
    this.setState({ games });
  }

  render() { 
    return ( 
      <React.Fragment>
        <NavBar totalGames={this.state.games.length} totalScore={this.state.games.map(game => game.score).reduce((p, n) => p + n)}/>
        <main style={{ marginTop: 80, marginBottom: 20 }} className="container">
          <Games
            games={this.state.games}
            onLevelUp={this.handleLevelUp}
            onGuess={this.handleGuesses}
            onScoreUp={this.handleScore}
          />
        </main>
      </React.Fragment>
    );
  }
}
 
export default App;