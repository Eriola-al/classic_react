import * as React from 'react';
import PropTypes from 'prop-types';
import { close } from './icons';
import Results from './Results';

function Instructions() {
    return (
        <section className='instructions-container'>
            <h2>Instructions</h2>
            <ol>
                <li>Enter 2 Github users</li>
                <li>Battle</li>
                <li>See the winners</li>
            </ol>
        </section>
    )
}

class PlayerInput extends React.Component {
    state = {
        username: ''
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.props.onSubmit(this.state.username)
    };

    handleChange = () => {
        this.setState({
            username: event.target.value
        });
    };

    render() {
        return (
            <form className="card" onSubmit={this.handleSubmit}>
                <label htmlFor="username" className="player-label">
                    {this.props.label}
                </label>
                <div className="input-row">
                    <input
                        type="text"
                        id="username"
                        placeholder="github username"
                        autoComplete="off"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <button
                        className="btn link"
                        type="submit"
                        disabled={!this.state.username}
                    >
                        Submit
                    </button>
                </div>
            </form>
        );
    }
}

function PlayerPreview({ username, onReset, label }) {
    return (
        <article className='card'>
            <h3 className='player-label'>{label}</h3>
            <div className='split'>
                <div className='row gap-md'>
                    <img
                        width={32}
                        height={32}
                        className='avatar'
                        src={`https://github.com/${username}.png?size=200`}
                        alt={`Avatar for ${username}`}
                    />
                    <a href={`https://github.com/${username}`} className='link'>
                        {username}
                    </a>
                </div>
                <button onClick={onReset} className='btn secondary icon'>
                    {close}
                </button>
            </div>
        </article>
    )
}

PlayerPreview.propTypes = {
    username: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

export default class Battle extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            playerOne: null,
            playerTwo: null,
            battle: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleSubmit(id, player) {
        this.setState({
            [id]: player
        });
    }

    handleReset(id) {
        this.setState({
            [id]: null
        });
    }

    render() {
        const { playerOne, playerTwo, battle } = this.state;
        const disabled = !playerOne || !playerTwo;

        if (battle === true) {
            return <Results playerOne={playerOne} playerTwo={playerTwo} />
        }

        return (
            <main className='stack main-stack animate-in'>
                <div className='split'>
                    <h1>Players</h1>
                    <button onClick={() => {this.setState({battle: true})}} className={`btn-primary ${disabled ? 'disabled' : ''}`}>
                        Battle
                    </button>
                </div>
                <section className='grid'>
                    {playerOne === null ? <PlayerInput label='Player One' onSubmit={(player) => this.handleSubmit('playerOne', player)} /> : <PlayerPreview label='Player One' username={playerOne} onReset={() => this.handleReset('playerOne')} />}
                    {playerTwo === null ? <PlayerInput label='Player Two' onSubmit={(player) => this.handleSubmit('playerTwo', player)} /> : <PlayerPreview label='Player Two' username={playerTwo} onReset={() => this.handleReset('playerTwo')} />}
                </section>
                <Instructions />
            </main>
        )
    }
}