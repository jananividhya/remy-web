import React from 'react';

export default ({text, link}) => (
    <span style={{
        fontWeight: 'bold',
        fontSize: '10px',
        color: 'rgba(150, 101, 171, 0.87)',
    }}>
        <a href={link} target="_">{text || 'Terms of Service'}</a>
    </span>
);