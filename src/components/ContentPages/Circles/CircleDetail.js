import React, { Component } from 'react';

const containerStyle = {
    border: '1px gray solid',
    display: 'inline-block',
    padding: 10
};

const contentStyle = {
    margin: 0
}


class CircleDetail extends Component {
    render() {
        const { id } = this.props.match.params;
        const { circleById } = this.props;
        const circle = circleById(id);
        if(typeof circle === 'undefined') {
            return (
                <div>
                    <p> Circle with id '{id}' does not exist.</p>
                </div>
            )
        }

        return (
            <div>
                <div style={containerStyle}>
                    <p style={contentStyle}>{circle.spaceName}</p>
                    <h1 style={contentStyle}>{circle.name}</h1>
                    <p style={contentStyle}>{circle.penName}</p>
                </div>
            </div>
        )
    }
}

export default CircleDetail;
