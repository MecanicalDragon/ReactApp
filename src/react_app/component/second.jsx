import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Jumbotron, Button} from 'reactstrap'
import * as routes from '@/router/routes'
import {setNavPosition} from "@/reducer/actions";
import {pageTwo} from "@/constants/paths";
import {FormattedMessage} from 'react-intl';

class Second extends Component {

    constructor(props){
        super(props);
        this.props.dispatch(setNavPosition(pageTwo));
    }

    render() {
        return (
            <Container>
                <Jumbotron>
                    <h1><FormattedMessage id={'app.second.header'}/></h1>
                    <Button color={"primary"} onClick={() => {
                        this.props.history.push(routes.pageThree())
                    }}><FormattedMessage id={'app.second.toThird'}/></Button>
                    <p/>
                    <Button onClick={() => {
                        this.props.history.push(routes.index())
                    }}><FormattedMessage id={'app.second.back'}/></Button>
                </Jumbotron>
            </Container>
        )
    }
}

export default connect()(Second);