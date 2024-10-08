import * as React from 'react';
import PropTypes, { element } from 'prop-types';
import Hover from './Hover';

const container = {
    position: 'relative',
    display: 'flex'
}

export default function Tooltip({ children, element }) {
    return (
        <Hover>
            {(hovering) => {
                return (
                    <div style={container}>
                        {hovering === true && element}
                        {children}
                    </div>
                );
            }}
        </Hover>
    )
}

Tooltip.prototypes = {
    children: PropTypes.node.isRequired,
    element: PropTypes.node.isRequired
}