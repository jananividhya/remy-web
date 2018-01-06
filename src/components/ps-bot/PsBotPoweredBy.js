import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

export default ({imgPath, height, width, poweredBySymbol = 'fa fa-bolt', text = 'purpleSlate'}) => (
    <span style={{
        fontSize: '14px',
    }}>
        <span style={{
            color: 'rgba(150, 101, 171, 0.87)',
            paddingRight: 3
        }}><i className={poweredBySymbol} /></span> by {text}
    </span>
);