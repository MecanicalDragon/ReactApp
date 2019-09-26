import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Jumbotron, Button} from 'reactstrap'
import * as routes from '@/router/routes'
import App from '@/hello/app'
import {setNavPosition} from "@/reducer/actions";
import {pageThree} from "@/constants/paths";
import {FormattedMessage} from 'react-intl';

class Third extends Component {

    constructor(props){
        super(props);
        this.props.dispatch(setNavPosition(pageThree));
    }

    render() {
        const helloApp = App();
        return (
            <Container>
                <Jumbotron>
                    <h1><FormattedMessage id={'app.third.header'}/></h1>
                    <Button onClick={() => {
                        this.props.history.push(routes.pageTwo())
                    }}><FormattedMessage id={'app.third.back'}/></Button>
                    {helloApp}
                </Jumbotron>
            </Container>
        )
    }
}

export default connect()(Third);