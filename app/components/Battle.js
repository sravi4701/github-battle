const React = require('react');


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
                playerTwoAvatar: `https://api.github.com/${username}`
            });
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    {this.state.playerOneName === '' && <PlayerInput id="playerOne" label="Player One " onSubmit={this.handleSubmit}/>}
                    {this.state.playerTwoName === '' && <PlayerInput id="playerTwo" label="Player Two" onSubmit={this.handleSubmit}/>}
                </div>
            </div>
        )
    }
}

module.exports = Battle;