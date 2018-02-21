import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

export default ({fontSize, height, width, poweredBySymbol = 'fa fa-bolt', text = 'purpleSlate', url = 'https://purpleslate.io'}) => {
    const openUrl = (url) => {
        window.open(url);
    };
    return (
        <span style={{
            fontSize: '14px',
        }}>
            <span style={{
                color: 'rgba(150, 101, 171, 0.87)',
                paddingRight: 3
            }}><i className={poweredBySymbol} /></span> by <span style={{
                cursor: 'pointer',
            }} onClick={() => openUrl(url)}>{text}</span>
        </span>
    );
};