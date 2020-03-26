import React, { Component } from 'react';
import GuessForm from './guessForm';

class Game extends Component {
    constructor(props) {
        super(props)
        const { min, max } = this.props.game

        this.state = {
            randNum: this.randomNumber(min, max),
            guess: "",
            status: "Let's Start",
            showSubmitTemp: true
        }
    }

    hideSubmitTemp() {
        this.setState({ showSubmitTemp: false });
    }

    handleSubmit = guess => {
        const { game, onGuess, onLevelUp, onScoreUp } = this.props;
        this.setState({ guess: "" })
        if ( parseInt(guess) <= game.max && parseInt(guess) >= game.min ){
            this.setState({ status: this.formatGuessStatus(this.state.randNum, this.state.guess) })
            onGuess(game, guess)
            onScoreUp(game)
            if(parseInt(guess) === this.state.randNum) {
                this.hideSubmitTemp()
                onLevelUp(game)
            }
        }
        else {
            alert('Guessed value is not in range');
        }
    }

    handleGuessChange = (event) => {
        this.setState({
            guess: event.target.value
        })
    }

    render() { 
        const { game } = this.props
        const { guess, status, showSubmitTemp } = this.state

        return (
            <div style={{ marginTop: 10 }} className="card">
                <div className={ this.getCardHeaderClasses() }>
                    <h5>Level {game.level} </h5>
                </div>
                <div className="container card-body">
                    <p>Guess the number between {game.min} and {game.max}</p>
                    { showSubmitTemp ?
                        <React.Fragment>
                            < GuessForm onSubmit={this.handleSubmit} guess={guess} game={game} onChange={this.handleGuessChange}/>
                        </React.Fragment> : null }
                    <h6 style={{ marginTop: 10 }}>Your Previous Guesses: { game.guesses.map(guess => 
                        <span key={game.level}>{guess} </span>)}
                        <span className={ this.getBatchClasses() }>{status}</span>
                    </h6>
                    <span style={{ position: "absolute", top: 80, right: 25 }} class="badge badge-pill badge-secondary">{game.score}</span>
                </div>
            </div>
        );
    }

    randomNumber(min, max) {
        min = Math.ceil(min); 
        max = Math.floor(max); 
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }

    getBatchClasses() {
        let classes = "badge m-2 badge-"
        classes += this.state.status === "Correct" ? "success" : this.state.status === "Hot" ? "danger" : this.state.status === "Warm" ? "warning" : "info";
        return classes;
    }

    getCardHeaderClasses() {
        let classes = "card-header text-white bg-"
        classes += this.state.status === "Correct" ? "success" : this.state.status === "Hot" ? "danger" : this.state.status === "Warm" ? "warning" : "info";
        return classes;
    }

    formatGuessStatus(randNum, guess) {
        let diff = Math.abs( randNum - guess ); 
        if ( diff === 0 ) {
            return "Correct";
        }
        else if ( diff > 15 ) {
            return "Cold";
        }
        else if ( diff > 4 && diff <= 15  ) {
            return "Warm";
        }
        else if ( diff >= 1 && diff <= 4  ) {
            return "Hot";
        }
    }
}
 
export default Game;