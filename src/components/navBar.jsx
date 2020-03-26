import React from 'react';

const NavBar = ({totalGames, totalScore}) => {
    return ( 
        <nav style={{ position: "fixed", top: 0, zIndex: 1 }} className="navbar navbar-dark bg-primary col-12">
            <a style={{ margin: "auto" }} className="navbar-brand" href="/">
                <h4>Number Guessing{" "}</h4>
            </a>
            <button style={{ position: "fixed", top: 80, left: 20 }} type="button" className="btn btn-primary">
                Game Level <span className="badge badge-light">{ totalGames }</span>
                <span className="sr-only">Level</span>
            </button>
            <button style={{ position: "fixed", top: 80, right: 20 }} type="button" className="btn btn-primary">
                Total Score <span className="badge badge-light">{ totalScore }</span>
                <span className="sr-only">Score</span>
            </button>
        </nav>
    );
}

export default NavBar;