// React imports
import React, {Component} from 'react';

// Material UI imports
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import TocIcon from 'material-ui-icons/Toc';
import SearchIcon from 'material-ui-icons/Search';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import {MuiThemeProvider, createMuiTheme, withStyles, createStyleSheet} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import classNames from 'classnames';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import {TransitionMotion, spring} from 'react-motion';


const drawerWidth = 601;

const menuOptions = [
    {
        key: '/hello',
        title: 'Say Hello to purpleBot',
        value: 'hello',
    },
    {
        key: '/learn',
        title: 'Learn with purpleBot',
        value: 'learn',
    },
    {
        key: '/aboutus',
        title: 'About Us',
        value: 'About us',
    },
    {
        key: '/quit',
        title: 'Talk to you later',
        value: 'quit',
    }
];

const styleSheet = createStyleSheet('PsBotNavbar', theme => ({
    root: {
        overflow: 'hidden',
    },
    appFrame: {
        display: 'flex',
    },
    appBar: {
        position: 'absolute',
        backgroundColor: '#FFFFFF !important',
        width: '98%',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'absolute',
        marginLeft: 20,
        marginTop: 20,
        height: 650,
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        width: '100%',
        marginLeft: -drawerWidth,
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            content: {
                height: 'calc(100% - 64px)',
                marginTop: 64,
            },
        },
    },
    contentShift: {
        marginLeft: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    appbarFlex: {
        flex: 1,
        textAlign: 'center',
    },
    logo: {
        height: '42px',
        fontSize: '42px',
        marginLeft: '-50px',
    },
    conversationOptions: {
        background: 'rgba(150, 101, 171, 0.87)',
        color: '#FFFFFF',
        boxShadow: '0px 0px',
        border: '1px solid #D2D1D2',
        borderRadius: '15px',
        fontSize: '14px',
        float: 'center',
        letterSpacing: '0px',
        paddingRight: '10px',
        paddingLeft: '10px',
        position: 'relative',
        width: '200px',
    },
    conversationGreeting: {
        color: 'purple',
        boxShadow: '0px 0px',
        fontSize: '20px',
        float: 'center',
        letterSpacing: '0px',
        paddingRight: '10px',
        paddingLeft: '10px',
        position: 'relative',
        marginLeft: '-95px',
        width: '400px',
    },
}));

const theme = createMuiTheme({
    overrides: {
        AppBar: {
            position: 'absolute',
            backgroundColor: 'green !important',
            width: '98%',
        }
    },
});

/**
 * @class PsBotCardImage
 * @extends Component
 * @description pS Bot Navbar
 */
class PsBotNavbar extends Component {

    constructor(props) {
        super(props);
        this.classes = props.classes;
        console.log('Theme ', props.theme);

    }

    state = {
        open: false,
    };

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    pSBotButtonClick = (button) => {
        const buttonValue = button;

        this.setState({open: false});
        this.props.action(buttonValue);
    };

    render() {
        return (<MuiThemeProvider theme={theme}>
            <div className={this.classes.root}>
                <div className={this.classes.appFrame}>
                    <AppBar position="static"
                            className={classNames(this.classes.appBar, this.state.open && this.classes.appBarShift)}
                            style={{
                                marginTop: this.props.marginTop,
                                marginLeft: this.props.marginLeft || 0,
                            }}>
                        <Toolbar disableGutters={!this.state.open}>
                            <IconButton aria-label="Share" onClick={this.handleDrawerOpen}
                                        className={classNames(this.classes.menuButton, this.state.open && this.classes.hide)}>
                                <TocIcon/>
                            </IconButton>
                            <Typography type="title" color="inherit" className={this.classes.appbarFlex}>
                                <IconButton aria-label="Share">
                                    <img src="psbot-logo.jpg" alt="PsBot" className={this.classes.logo}/>
                                </IconButton>
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        type="permanent"
                        classes={{
                            paper: this.classes.drawerPaper,
                        }}
                        open={this.state.open}
                    >
                        <div className={this.classes.drawerInner}>
                            <div className={this.classes.drawerHeader}>
                                <IconButton onClick={this.handleDrawerClose}>
                                    <ChevronLeftIcon/>
                                </IconButton>
                            </div>
                            <Divider/>
                            <TransitionMotion defaultStyles={[
                                {key: 'greet-welcome', style: {marginTop: 0}},
                                {key: 'greet-what', style: {marginTop: 0}},
                                {key: 'hello', style: {marginTop: 0}},
                                {key: 'learn', style: {marginTop: 0}},
                                {key: 'about-us', style: {marginTop: 0}},
                                {key: 'our-philosophy', style: {marginTop: 0}},
                                {key: 'careers', style: {marginTop: 0}},
                                {key: 'quit', style: {marginTop: 0}}
                            ]}
                                              styles={[
                                                  {
                                                      key: 'greet-welcome', style: {marginTop: spring(110)}, data: {
                                                      type: 'Greet',
                                                      title: "Hello, I'm purpleBot",
                                                  }
                                                  },
                                                  {
                                                      key: 'greet-what', style: {marginTop: spring(10)}, data: {
                                                      type: 'Greet',
                                                      title: 'Some things you can ask me..',
                                                  }
                                                  },
                                                  {
                                                      key: 'hello', style: {marginTop: spring(30)}, data: {
                                                      type: 'Command',
                                                      title: 'Say Hello to purpleBot',
                                                      value: 'Hello',
                                                  }
                                                  },
                                                  {
                                                      key: 'learn', style: {marginTop: spring(10)}, data: {
                                                      type: 'Command',
                                                      title: 'Learn with purpleBot',
                                                      value: 'learn',
                                                  }
                                                  },
                                                  {
                                                      key: 'about-us', style: {marginTop: spring(10)}, data: {
                                                      type: 'Command',
                                                      title: 'About us',
                                                      value: 'About us',
                                                  }
                                                  },
                                                  {
                                                      key: 'our-philosophy', style: {marginTop: spring(10)}, data: {
                                                      type: 'Command',
                                                      title: 'Our Philosophy',
                                                      value: 'Our Philosophy',
                                                  }
                                                  },
                                                  {
                                                      key: 'careers', style: {marginTop: spring(10)}, data: {
                                                      type: 'Command',
                                                      title: 'Careers @ Purpleslate',
                                                      value: 'Careers',
                                                  }
                                                  },
                                                  {
                                                      key: 'quit', style: {marginTop: spring(10)}, data: {
                                                      type: 'Command',
                                                      title: 'Talk to you later',
                                                      value: 'quit',
                                                  }
                                                  }
                                              ]}
                            >
                                {(styles) => (
                                    <div>
                                        {styles.map(({key, style, data}) => (
                                            <div key={key} style={{
                                                textAlign: 'center',
                                                marginLeft: '190px',
                                                cursor: 'pointer',
                                                ...style
                                            }}>
                                                {(data.type === 'Greet') ? (
                                                    <Paper className={this.classes.conversationGreeting}>
                                                        <div className={this.classes.conversationText}>
                                                            <p>
                                                                {data.title}
                                                            </p>
                                                        </div>
                                                    </Paper>
                                                ) : (
                                                    <Paper className={this.classes.conversationOptions}
                                                           onClick={() => this.pSBotButtonClick(data.value)}>
                                                        <div className={this.classes.conversationText}>
                                                            <p>
                                                                {data.title}
                                                            </p>
                                                        </div>
                                                    </Paper>
                                                )
                                                }
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </TransitionMotion>
                        </div>
                    </Drawer>
                </div>
            </div>
        </MuiThemeProvider>);
    }
}

PsBotNavbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PsBotNavbar);