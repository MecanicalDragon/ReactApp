import React, {Fragment, Component} from 'react';
import {Container, Jumbotron, Button} from 'reactstrap'

export default class HelloComponent extends Component {

    // this construction below makes constructor obsolete!
    state = {
        // '||' operator here defines val to 666 if it's null or undefined
        value: this.props.val || 666
    };

    constructor(props) {
        super(props);
        this.state = {
            value: props.val || 666
        };

        // here we allow access to component context (state and props) in decrement function
        this.decrement = this.decrement.bind(this);
    }

    decrement() {
        // here setState takes a callback function, that changes component state, depending on previous state
        this.setState(({value}) => {
            return {value: value - 1}
        })
    }

    // this function is bounded to component state automatically (WOW!)
    simpleInc = () => this.setState(({value}) => ({value: value + 1}));

    render() {
        const {value} = this.state;
        return (
            <Fragment>
                <Button onClick={this.decrement}>-</Button>
                <p>NDR {value}</p>
                <Button onClick={this.simpleInc}>+</Button>
            </Fragment>
        )
    }
};