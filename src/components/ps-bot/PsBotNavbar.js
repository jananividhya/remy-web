// React imports
import React, {Component} from 'react';

// Material UI imports
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import TocIcon from 'material-ui-icons/Toc';
import FavoriteBorder from 'material-ui-icons/FavoriteBorder';
import SearchIcon from 'material-ui-icons/Search';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';

const styleSheet = createStyleSheet('PsBotNavbar', theme => ({
    appbar: {
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
        return ( <AppBar position="static" className={this.classes.appbar} style={{
            marginTop: this.props.marginTop,
            marginLeft: this.props.marginLeft || 0,
        }}>
            <Toolbar>
                <IconButton color="default" aria-label="Menu">
                    <SearchIcon />
                </IconButton>
                <Typography type="title" color="inherit" className={this.classes.appbarFlex}>
                    <IconButton aria-label="Share">
                        <img src="psbot-logo.jpg" alt="PsBot" className={this.classes.logo} />
                    </IconButton>
                </Typography>
                <IconButton aria-label="Share">
                    <TocIcon className={this.classes.logo} />
                </IconButton>
            </Toolbar>
        </AppBar> );
    }
}

PsBotNavbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PsBotNavbar);
