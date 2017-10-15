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

    getImageDetails = async () => {
        const imageDetails = await fetch(this.props.imageUrl);
        return await imageDetails.blob();
    };

    componentDidMount = async () => {
        try {
            const imageBlog = await this.getImageDetails();
            const imageObj = URL.createObjectURL(imageBlog);
            this.imageSrc = imageObj.src;
        } catch (err) {
            this.imageSrc = 'arrow.png';
        }

    };

    render() {
        return ( <p>
            <CardMedia>
                <img src={this.imageSrc} alt=""
                    style={{height: this.props.height || '240', width: this.props.width || '240'}} />
            </CardMedia>
        </p> );
    }
}

PsBotCardImage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PsBotCardImage);
