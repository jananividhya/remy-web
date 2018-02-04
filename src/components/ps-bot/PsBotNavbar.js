// React imports
import React, {Component} from 'react';

// Material UI imports
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import TocIcon from 'material-ui-icons/Toc';
import AccountIcon from 'material-ui-icons/AccountCircle';
import LogoutIcon from 'material-ui-icons/ExitToApp';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import classNames from 'classnames';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import {TransitionMotion, spring} from 'react-motion';
import Avatar from 'material-ui/Avatar';

let styleSheet = createStyleSheet('PsBotNavbar', theme => ({
    root: {
        width: '100%',
        position: 'fixed',
        marginTop: '-61px',
        zIndex: '100000'
    },
    appFrame: {
        display: 'flex',
    },
    appBar: {
        position: 'absolute',
        width: '100%',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
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
        this.state = {
            open: false,
            theme: props.theme,
            themeType: 'light',
        };
    }

    pSBotButtonClick = (button) => {
        const buttonValue = button;

        this.setState({open: false});
        this.props.action(buttonValue);
    };

    psBotLogout = () => {
        this.props.logout();
    };

    switchTheme = () => {
        if (this.state.themeType === 'light') {
            this.setState({
                theme: {
                    appBar: {
                        background: '#766E6A'
                    },
                    logo: {
                        imageUrl: 'arrow.png'
                    }
                },
                themeType: 'dark'
            }, () => {
                console.info(`Appbar color used ${this.state.theme.appBar.background}`);
            });
        } else {
            this.setState({
                theme: {
                    appBar: {
                        background: '#FFFFFF'
                    },
                    logo: {
                        imageUrl: 'psbot-logo.png'
                    }
                },
                themeType: 'light'
            }, () => {
                console.info(`Appbar color used ${this.state.theme.appBar.background}`);
            });
        }
    };

    render() {

        const botLogo = (this.state.theme.logo) ? this.state.theme.logo.imageUrl : 'arrow.png';

        return (<div className={this.classes.root}>
            <AppBar position="static" style={{
                background: '#FFFFFF'
            }}>
                <Toolbar>
                    <IconButton className={this.classes.menuButton} color="inherit" aria-label="Menu">
                        <TocIcon />
                    </IconButton>
                    <Typography type="title" color="inherit" className={this.classes.appbarFlex}>
                        <IconButton aria-label="Remy">
                            <img src={botLogo} alt="Remy" className={this.classes.logo}/>
                        </IconButton>
                    </Typography>
                    <IconButton aria-label="User"
                                className={classNames(this.state.open && this.classes.hide)}>
                        {
                            this.props.user.id ? (<Avatar
                                alt={this.props.user.name}
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                                src={this.props.user.imageUrl} />) : (<AccountIcon/>)
                        }
                    </IconButton>
                    {
                        this.props.user.id &&<IconButton aria-label="Logout" onClick={() => this.psBotLogout()}>
                            <LogoutIcon />
                        </IconButton>
                    }
                </Toolbar>
            </AppBar>
        </div>);
    }
}

PsBotNavbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PsBotNavbar);