const React = require('react');

const api = require('../utils/api');


function RepoGrid(props) {
    return (
        <ul className="popular-list">
            {props.repos.map((repo, index) => {
                return (
                <li key={repo.name} className="popular-item">
                    <div className="popular-rank">#{index + 1}</div>
                    <ul className="space-list-items">
                        <li>
                            <img
                                className="avatar"
                                src={repo.owner.avatar_url}
                                alt={'Avatart for ' + repo.owner.login}
                            />
                        </li>
                        <li><a href={repo.html_url}>{repo.name}</a></li>
                        <li>@{repo.owner.login}</li>
                        <li>{repo.stargazers_count} stars</li>
                    </ul>
                </li>
                )
            })}
        </ul>
    )
}


function SelectLanguage(props) {
    const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
    console.log('selected language', props.selectedLanguage);
    return (
        <ul className="languages">
        {languages.map((language, index) => {
            return (
                <li 
                key={language}
                style={language === props.selectedLanguage ? {'color': '#d0021b'}: null}
                onClick={props.onSelect.bind(null, language)}>
                    {language}
                </li>
            );
        })
        }
        </ul>
    )
}

class Popular extends React.Component {

    constructor(props) {
        super(props);
        this.state =  {
            selectedLanguage: 'All',
            repos: null
        };
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage(language) {
        this.setState((state, props) => {
            return {
                selectedLanguage: language,
                repos: null
            }
        });
        api.fetchPopularRepose(language).then(repos => {
            this.setState({repos});
        });
    }
    

    render() {
        return (
            <div>
                <SelectLanguage selectedLanguage={this.state.selectedLanguage} onSelect={this.updateLanguage} />
                {!this.state.repos?<p>LOADING</p>:<RepoGrid repos={this.state.repos} />}
            </div>
        );
    }
}

module.exports = Popular;