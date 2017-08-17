// React imports
import React, {Component} from 'react';

// Material UI imports
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import ShareIcon from 'material-ui-icons/Share';
import FavoriteBorder from 'material-ui-icons/FavoriteBorder';
import MenuIcon from 'material-ui-icons/Menu';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';

const styleSheet = createStyleSheet('PsBotNavbar', theme => ({
    appbar: {
        marginTop: '-80px',
        marginLeft: '-10px',
        width: 600,
        zIndex: 1000,
        position: 'absolute',
        background: '#FFFFFF',
    },
    appbarFlex: {
        flex: 1,
        textAlign: 'center',
    },
    logo: {
        height: '42px',
        fontSize: '42px',
        marginLeft: '20px',
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
                        <img src="psbot-logo.jpg" alt="PsBot" className={this.classes.logo} />
                    </IconButton>
                </Typography>
                <IconButton aria-label="Share">
                    <ShareIcon className={this.classes.logo} />
                </IconButton>
                <IconButton aria-label="Like">
                    <FavoriteBorder className={this.classes.logo} />
                </IconButton>
            </Toolbar>
        </AppBar> );
    }
}

PsBotNavbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PsBotNavbar);
