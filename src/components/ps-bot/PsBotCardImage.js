// React imports
import React, {Component} from 'react';

// Material UI imports
import {CardMedia} from 'material-ui/Card';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';

const styleSheet = createStyleSheet('PsBotCardImage', theme => ({
    responseImage: {
        height: '240px',
        width: '240px'
    },
}));

/**
 * @class PsBotCardImage
 * @extends Component
 * @description pS Bot Image Card Response
 */
class PsBotCardImage extends Component {

    constructor(props) {
        super(props);
        this.classes = props.classes;
    }

    render() {
        return ( <p>
            <CardMedia>
                <img src={this.props.imageUrl} alt="" className={this.classes.responseImage} />
            </CardMedia>
        </p> );
    }
}

PsBotCardImage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PsBotCardImage);