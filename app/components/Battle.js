const React = require('react');
const Link = require('react-router-dom').Link;
const PlayerPreview = require('./PlayerPreview');

class PlayerInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;
        this.setState({
            username: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.props.id, this.state.username);
    }

    render() {
        return (
            <form className="column" onSubmit={this.handleSubmit}>
                <label className="header" htmlFor="username">{this.props.label}</label>
                <input type="text" id="username" placeholder="github username" autoComplete="off" value={this.state.username} onChange={this.handleChange} />
                <button className="button" type="submit">Submit</button>
            </form>
        )
    }
}


class Battle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playerOneName: '',
            playerTwoName: '',
            playerOneAvatar: null,
            playerTwoAvatar: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnReset = this.handleOnReset.bind(this);
    }

    handleSubmit(id, username) {
        if (id === 'playerOne') {
            this.setState(() => {
                return {
                    playerOneName: username,
                    playerOneAvatar: `https://github.com/${username}.png?size=200`
                }
            });
        } else if (id === 'playerTwo') {
            this.setState({
                playerTwoName: username,
                playerTwoAvatar: `https://github.com/${username}.png?size=200`
            });
        }
    }

    handleOnReset(id) {
        if (id === 'playerOne') {
            this.setState(() => {
                return {
                    playerOneName: '',
                    playerOneAvatar: null
                }
            });
        } else if (id === 'playerTwo') {
            this.setState({
                playerTwoName: '',
                playerTwoAvatar: null
            });
        }
    }

    render() {
        const currentPath = this.props.match.url;
        const playerOneName = this.state.playerOneName;
        const playerTwoName = this.state.playerTwoName;
        const playerOneImage = this.state.playerOneAvatar;
        const playerTwoImage = this.state.playerTwoAvatar;
        return (
            <div>
                <div className="row">
                    {!playerOneName && <PlayerInput id="playerOne" label="Player One " onSubmit={this.handleSubmit}/>}
                    {
                        playerOneImage && 
                        <PlayerPreview avatar={playerOneImage} username={playerOneName}>
                            <button className="button" onClick={this.handleOnReset.bind(null, "playerOne")}>Reset</button>
                        </PlayerPreview>}
                    {!playerTwoName && <PlayerInput id="playerTwo" label="Player Two" onSubmit={this.handleSubmit}/>}
                    {playerTwoImage && 
                    <PlayerPreview avatar={playerTwoImage} username={playerTwoName} >
                            <button className="button" onClick={this.handleOnReset.bind(null, "playerTwo")}>Reset</button>
                    </PlayerPreview>}
                </div>
                <div>
                    {playerOneImage && playerTwoImage && 
                            <Link to={{pathname: `${currentPath}/results`, search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`}}>Battle</Link>
                        }
                </div>
            </div>
        )
    }
}

module.exports = Battle;
