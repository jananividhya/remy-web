import React from 'react';

const getHeight = (height) => {
    return (height) ? height : '15px';
};

const getWidth = (width) => {
    return (width) ? width : '130px';
};

export default ({imgPath, height, width}) => (
    <span style={{
        fontWeight: 'bold',
        color: 'rgba(150, 101, 171, 0.87)',
    }}>
        <img src={imgPath} height={getHeight(height)} width={getWidth(width)} />
    </span>
);