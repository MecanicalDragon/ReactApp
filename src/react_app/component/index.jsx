import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Jumbotron, Button} from 'reactstrap'
import * as routes from '@/router/routes'
import {setNavPosition} from "@/reducer/actions";
import {Home} from "@/constants/paths";
import {FormattedMessage} from 'react-intl';

class Index extends Component {

    constructor(props){
        super(props);
        this.props.dispatch(setNavPosition(Home));
    }

    render() {
        return (
            <Container>
                <Jumbotron>
                    <h1 id={"titleHeader"}><FormattedMessage id={'app.index.header'}/></h1>
                    <Button id={"to1button"} color={"primary"} onClick={() => {
                        this.props.history.push(routes.pageOne())
                    }}><FormattedMessage id={'app.index.toFirst'}/></Button>
                    <p/>
                    <Button id={"to2button"} color={"primary"} onClick={() => {
                        this.props.history.push(routes.pageTwo())
                    }}><FormattedMessage id={'app.index.toSecond'}/></Button>
                </Jumbotron>
            </Container>
        )
    }
}

export default connect()(Index);