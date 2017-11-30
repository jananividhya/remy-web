import React from 'react';

export default ({className, style, onClick}) => (
    <div
        className={className}
        style={{...style, display: 'block', background: 'lightgrey', borderRadius: '40%', marginLeft: '18px'}}
        onClick={onClick}
    >
    </div>
);