const React = require('react');

const Popular = require('./Popular');
const {BrowserRouter, Route, Switch} = require('react-router-dom');
const Home = require('./Home');
const Battle = require('./Battle');
const NavBar = require('./Navbar');

// component inputs
// state
// lifecycle events
// UI
class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className='container'>
                    <NavBar />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/popular" component={Popular}/>
                        <Route path="/battle" component={Battle} />
                        <Route render={() => <p>Not Found</p>} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

module.exports = App;