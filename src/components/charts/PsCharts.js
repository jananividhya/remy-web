import React, {Component} from 'react';

import { Card, Button, Icon } from 'semantic-ui-react';

// Lodash imports
import isEqual from 'lodash/isEqual';

// Chart.js imports
import Chart from 'chart.js';
import 'chartjs-plugin-datalabels';

import ChartDefaults from './PsCharts.global';

export default class PsCharts extends Component {

    static defaultProps = {
        legend: {
            display: true
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            fullDataset: {},
            partialDataset: {},
            showMore: true,
            emailSent: false
        };
    }

    memoizeDataProps() {
        if (!this.props.data) {
            return;
        }

        const data = this.transformDataProp(this.props);

        this.shadowDataProp = {
            ...data,
            datasets: data.datasets && data.datasets.map(set => {
                return {
                    ...set
                };
            })
        };

        return data;
    }

    transformDataProp(props) {
        const { data } = props;
        if (typeof(data) === 'function') {
            const node = this.element;
            return data(node);
        } else {
            return data;
        }
    }

    createChart() {
        const {options, legend, type, plugins} = this.props;
        const node = this.element;
        let data = this.memoizeDataProps();

        if(typeof legend !== 'undefined' && !isEqual(PsCharts.defaultProps.legend, legend)) {
            options.legend = legend;
        }

        if (type !== 'pie') {
            options.plugins = {
                datalabels: {
                    anchor: 'end',
                    offset: 2,
                    align: 'right',
                    formatter: function(value, context) {
                        return value;
                    },
                    color: 'black',
                }
            };
        } else {
            options.plugins = {
                datalabels: {
                    display: false
                }
            };
        }

        // Check if the dataset is greater than 3. If yes, chunk the dataset to 3 and persist others in component state.
        // If no, render the dataset as is.
        if (data.datasets[0].data.length > 3 && type !== 'pie') {
            this.setState({
                fullDataset: Object.assign({}, data)
            });
            data.labels = data.labels.slice(0, 3);
            this.setState({
                partialDataset: data
            });
        }

        data.datasets[0].backgroundColor = !data.datasets[0].backgroundColor ? ChartDefaults.backgroundColor : data.datasets[0].backgroundColor;

        this.chartInstance = new Chart(node, {
            type,
            data,
            options,
            plugins
        });

    }

    ref = (element) => {
        this.element = element;
    };

    componentWillMount() {
    }

    componentDidMount() {
        this.createChart();
    }

    showMore = (shouldShowMore) => {
        this.chartInstance.config.data = shouldShowMore ? this.state.fullDataset : this.state.partialDataset;
        //this.chartInstance.canvas.style.height = shouldShowMore ? '350px' : this.props.height;
        this.chartInstance.update();
        this.chartInstance.resize();

        this.setState((prevState) => ({
            showMore: !prevState.showMore
        }));
    };

    exportImage = async () => {
        const base64Image = this.chartInstance.toBase64Image();

        const mailBody = {
            to: this.props.user.email,
            userName: this.props.user.name,
            subject: 'Hello from Remy!',
            base64EncodedImage: base64Image
        };

        let request = new Request('https://purpleslate-remy-mailer.now.sh/api/mail',
            {method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(mailBody)});

        const response = await fetch(request);
        await response.json();

        this.setState({
            emailSent: true
        });
    };

    render() {

        const { height, width, showMore, email } = this.props;

        return (
            <Card style={{
                marginBottom: '13px',
                marginTop: '10px',
                marginLeft: '30px',
                width: '420px',
                fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif"
            }}>
                <Card.Content style={{
                    paddingRight: '10px'
                }}>
                    <div className='ps-ui input'>
                        <canvas
                            ref={this.ref}
                            width={width}
                            height={height}
                        />
                    </div>
                </Card.Content>
                <Card.Content extra>
                    <div className='ps-ui input'>
                        {showMore&&<Button animated='fade' onClick={() => this.showMore(this.state.showMore)} style={{
                            background: '#44AA5F',
                            color: '#FFFFFF',
                        }}>
                            <Button.Content visible>
                                {this.state.showMore ?
                                    <p>Show More</p> : <p>Show Less</p>
                                }
                            </Button.Content>
                            <Button.Content hidden>
                                {this.state.showMore ?
                                    <Icon name="angle double down"/> : <Icon name="angle double up"/>
                                }
                            </Button.Content>
                        </Button>}
                        {email&&<Button animated='fade' onClick={() => this.exportImage()} style={{
                            background: '#44AA5F',
                            color: '#FFFFFF',
                        }}
                                disabled={this.state.emailSent}
                        >
                            <Button.Content visible>
                                {this.state.emailSent ? <p>Email Sent</p> : <p>Send an Email</p>}
                            </Button.Content>
                            <Button.Content hidden>
                                <Icon name="mail forward"/>
                            </Button.Content>
                        </Button>}
                    </div>
                </Card.Content>
            </Card>
        );
    }

}