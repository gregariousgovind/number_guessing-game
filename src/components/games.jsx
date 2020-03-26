import React, { Component } from 'react';
import Game from './game'

class Games extends Component {
    render() {
        const { games, onLevelUp , onGuess, onScoreUp } = this.props;
        return ( 
            <div>
                { games.slice(0).reverse().map(game => 
                    <Game key={game.level} game={game} onLevelUp={onLevelUp} onGuess={onGuess} onScoreUp={onScoreUp}/>
                )}
            </div>
        );
    }
}

export default Games;