// React imports
import React, {Component} from 'react';

// Timer Icon Imports
import TimerIcon from 'material-ui-icons/Timer';
import TimerOffIcon from 'material-ui-icons/TimerOff';

/**
 * @class PsBotTimer
 * @extends Component
 *
 * PsBotTimer component renders the timer component to the client
 * and does a cb when timer ends
 */
class PsBotTimer extends Component {

    /**
     * PsBotTimer Constructor
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            timerActive: true,
            startTime: new Date(),
            endTime: new Date(),
            timerValue: this.props.options.totalTime,
            displayValue: '',
        };
    }

    componentDidMount = () => {
        this.setDisplayValue(this.props.options.totalTime);
        this.timerInterval = setInterval(this.psTick, 1000);
    };

    componentWillUnmount = () => {
        clearInterval(this.timerInterval);
    };

    turnOffTimer = () => {
        clearInterval(this.timerInterval);
        this.props.action({
            timerAutoOff: false,
            stopValue: this.state.timerValue,
            startTime: this.state.startTime,
            endTime: new Date()
        });
    };

    setDisplayValue = (timeToFormat) => {
        const minutes = Math.floor(timeToFormat / 60000);
        const seconds = ((timeToFormat % 60000) / 1000).toFixed(0);

        this.setState({
            displayValue: minutes + ':' + (seconds < 10 ? '0' : '') + seconds
        });
    };

    psTick = () => {
        const timerValue = parseInt(this.state.timerValue);

        if (timerValue > 0) {
            this.setState({
                timerValue: timerValue - 1000
            });

            this.setDisplayValue(this.state.timerValue);
        } else {
            this.setState({
                timerActive: false
            });
        }

        if (!this.state.timerActive) {
            clearInterval(this.timerInterval);
            if (this.props.action) {
                this.props.action({
                    timerAutoOff: true,
                    stopValue: this.state.timerValue,
                    startTime: this.state.startTime,
                    endTime: new Date()
                });
            }
        }
    };

    render() {
        return (
            <span>
                {(this.state.timerActive) ? <TimerIcon/> : <TimerOffIcon/>}
                <span> {this.state.displayValue} </span>
            </span>
        );
    }
}

export default PsBotTimer;