// React imports
import React, {Component} from 'react';

// Material UI imports
import {CardMedia} from 'material-ui/Card';

import { Image, Modal } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

/**
 * @class PsBotCardImage
 * @extends Component
 * @description pS Bot Image Card Response
 */
class PsBotCardImage extends Component {

    state = {
        zoom: false,
        size: 'small'
    };

    getImageDetails = async () => {
        const imageDetails = await fetch(this.props.imageUrl);
        return await imageDetails.blob();
    };

    componentWillMount = async () => {
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

    zoom = dimmer => () =>
        this.setState({
            dimmer,
            zoom: true,
    });

    closeZoom = () => {
        this.setState({
            zoom: false,
        });
    };

    render() {

        const { dimmer, zoom, size } = this.state;

        return (
            <div>
            <CardMedia style={{
                paddingTop: 10,
                paddingBottom: 10,
                cursor: 'pointer',
            }}>
                <img src={this.imageSrc} alt=""
                     onClick={this.zoom('blurring')}
                    style={{
                        width: this.props.width || '250px',
                        borderRadius: '10px 10px 10px 10px',
                        marginTop: '5px',
                        marginBottom: '5px',
                    }} />
            </CardMedia>

            <Modal size={size} dimmer={dimmer} open={zoom} style={{
                    marginTop: 0,
                    width: '100%',
                }}
                closeOnEscape={true}
                closeOnRootNodeClick={true}
                onClose={() => this.closeZoom()}
            >
                <Modal.Content>
                    <Image src={this.imageSrc} size="large" />
                </Modal.Content>
            </Modal>

            </div>
        );
    }
}

export default PsBotCardImage;
