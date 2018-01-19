// React imports
import React, {Component} from 'react';

// Material UI imports
import {CardMedia} from 'material-ui/Card';

/**
 * @class PsBotCardImage
 * @extends Component
 * @description pS Bot Image Card Response
 */
class PsBotCardImage extends Component {

    getImageDetails = async () => {
        const imageDetails = await fetch(this.props.imageUrl);
        return await imageDetails.blob();
    };

    componentDidMount = async () => {
        if (this.props.fetchImage) {
            try {
                const imageBlog = await this.getImageDetails();
                const imageObj = URL.createObjectURL(imageBlog);
                this.imageSrc = imageObj.src;
            } catch (err) {
                this.imageSrc = 'arrow.png';
            }
        } else {
            this.imageSrc = this.props.imageUrl;
        }

    };

    render() {
        return (
            <CardMedia style={{
                paddingTop: 10,
                paddingBottom: 10
            }}>
                <img src={this.imageSrc} alt=""
                    style={{height: this.props.height || '240px', width: this.props.width || '240px'}} />
            </CardMedia>
        );
    }
}

export default PsBotCardImage;
