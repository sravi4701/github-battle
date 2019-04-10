const React = require('react');
var ReactDOM = require('react-dom');
// import App component
const App = require('./components/App');

require('./index.css')

// render app component to dom element where id is root.
ReactDOM.render(<App />, document.getElementById('root'));