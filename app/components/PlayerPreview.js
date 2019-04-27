const React = require('react');

function PlayerPreview(props) {
    return (
        <div>
            <img className="avatar" src={props.avatar} alt={'image for player' + props.username}/>
            <p>{props.username}</p>
            {props.children}
        </div>
    )
}

module.exports = PlayerPreview;
