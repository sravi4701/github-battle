const React = require('react');

const api = require('../utils/api');
const queryString = require('query-string');
const Link = require('react-router-dom').Link;
const PlayerPreview = require('./PlayerPreview');


function Profile(props) {
    return (
        <PlayerPreview username={info.login} avatar={info.avatar_url}>
            <div>
                <ul className="space-list-items">
                    {info.name && <li>{info.name}</li>}
                    {info.location && <li>{info.location}</li>}
                    {info.company && <li>{info.company}</li>}
                    <li>Followers: {info.followers}</li>
                    <li>Following: {info.following}</li>
                    <li>Public Repos: {info.public_repos}</li>
                    {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
                </ul>
            </div>
        </PlayerPreview>
    )
}

function Player(props) {
    const info = props.profile;
    console.log('info', info);
    return (
        <div>
            <label className="header" >{props.label}</label>
            <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
            <Profile />
        </div>
    );
}

class Results extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }

    componentDidMount() {
        const players = queryString.parse(this.props.location.search);
        api.battle([players.playerOneName, players.playerTwoName]).then(results => {
            if (results === null) {
                this.setState({
                    error: 'Something Went Wrong Users not found on github',
                    loading: false
                })
            } else {
                this.setState({
                    loading: false,
                    winner: results[0],
                    loser: results[1],
                    error: null
                })
            }
        });
    }


    render() {
        if (this.state.loading) {
            return <p>LOADING..</p>
        }
        if (this.state.error) {
            return (
                <div>
                    <p>{this.state.error}</p>
                    <Link to="/battle">RESET</Link>
                </div>
            )
        }
        return (
            <div className="row">
                <Player label="Winner" score={this.state.winner.score} profile={this.state.winner.profile} />
                <Player label="Loser" score={this.state.loser.score} profile={this.state.loser.profile} /> 
            </div>
        )
    }
}

module.exports = Results;