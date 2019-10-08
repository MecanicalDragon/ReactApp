import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setNavPosition} from "@/reducer/actions";
import {Denied} from "@/constants/paths";
import {Container, Jumbotron, Button} from 'reactstrap'
import * as routes from '@/router/routes'
import {FormattedMessage} from 'react-intl';

class Page403 extends Component {

    constructor(props) {
        super(props);
        this.props.dispatch(setNavPosition(Denied));
    }

    render(){
        return (
            <Container>
                <Jumbotron>
                    <h1 id={"denied"}><FormattedMessage id={'app.403'}/></h1>
                    <Button id={"toHomeButton"} color={"primary"} onClick={() => {
                        this.props.history.push(routes.index())
                    }}><FormattedMessage id={'app.breadcrump.home'}/></Button>
                </Jumbotron>
            </Container>
        )
    }
}

export default connect()(Page403)