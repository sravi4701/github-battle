const React = require('react');

class Popular extends React.Component {

    constructor(props) {
        super(props);
        this.state =  {
            selectedLanguage: 'All'
        };
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    updateLanguage(language) {
        this.setState((state, props) => {
            return {
                selectedLanguage: language
            }
        });
    }

    render() {
        const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
        const languagesLi = languages.map((language, index) => {
            return (
                <li 
                key={language}
                style={language === this.state.selectedLanguage ? {'color': '#d0021b'}: null}
                onClick={this.updateLanguage.bind(null, language)}>
                    {language}
                </li>
            );
        });
        return (
            <div>
                <ul className="languages">
                    {languagesLi}
                </ul>
            </div>
        );
    }
}

module.exports = Popular;