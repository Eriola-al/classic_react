import * as React from 'react';
import PropTypes, { element } from 'prop-types';
import withHover from './withHover';

const container = {
    position: 'relative',
    display: 'flex'
}

class Tooltip extends React.Component {
    render() {
        const {children, element, hovering} = this.props;

        return (
            <div
                onMouseOver={this.mouseOver}
                onMouseOut={this.mouseOut}
                style={container}
            >
                {hovering === true && element}
                {children}
            </div>
        )
    }
}

Tooltip.prototypes = {
    children: PropTypes.node.isRequired,
    element: PropTypes.node.isRequired
}

export default withHover(Tooltip);