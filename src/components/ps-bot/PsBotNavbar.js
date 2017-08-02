// React imports
import React, {Component} from 'react';

// Material UI imports
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import ShareIcon from 'material-ui-icons/Share';
import ThumbUpIcon from 'material-ui-icons/ThumbUp';
import ChatIcon from 'material-ui-icons/Chat';
import MenuIcon from 'material-ui-icons/Menu';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';

const styleSheet = createStyleSheet('PsBotNavbar', theme => ({
    appbar: {
        marginTop: '-30px',
        marginLeft: '-20px',
        width: 615,
        background: 'rgba(150, 101, 171, 0.87)',
    },
    appbarFlex: {
        flex: 1,
        textAlign: 'center',
    },
}));

/**
 * @class PsBotCardImage
 * @extends Component
 * @description pS Bot Navbar
 */
class PsBotNavbar extends Component {

    constructor(props) {
        super(props);
        this.classes = props.classes;
    }

    render() {
        return ( <AppBar position="static" className={this.classes.appbar}>
            <Toolbar>
                <IconButton color="default" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
                <Typography type="title" color="inherit" className={this.classes.appbarFlex}>
                    <IconButton aria-label="Share">
                        <ChatIcon />
                    </IconButton>
                </Typography>
                <IconButton aria-label="Share">
                    <ShareIcon />
                </IconButton>
                <IconButton aria-label="Like">
                    <ThumbUpIcon />
                </IconButton>
            </Toolbar>
        </AppBar> );
    }
}

PsBotNavbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PsBotNavbar);
