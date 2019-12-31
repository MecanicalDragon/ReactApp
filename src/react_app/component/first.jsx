import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Jumbotron, Button, Row, Input, Form} from 'reactstrap'
import * as routes from '@/router/routes'
import {setNavPosition} from '@/reducer/actions'
import {pageOne} from '@/constants/paths'
import {FormattedMessage} from 'react-intl';
import {NotificationManager} from 'react-notifications';


class First extends Component {

    constructor(props) {
        super(props);
        this.props.dispatch(setNavPosition(pageOne));
        this.state = {
            name: '',
            surname: ''
        }
    }

    submit = () => {
        NotificationManager.success(this.state.name, this.state.surname, 3000, () => {
        });
    };

    handleChanges = async (event) => {
        const {target} = event;
        const {name} = target;
        await this.setState({[name]: target.value});
    };

    render() {
        const {name, surname} = this.state;
        return (
            <Container>
                <Jumbotron>
                    <h1 id={"page1header"}><FormattedMessage id={'app.first.header'}/></h1>
                    <Row>
                        <Form>
                            <Input type={"text"} id={"nameInput"} name={"name"} value={name} placeholder={"name"}
                                   onChange={event => this.handleChanges(event)}/>
                            <Input type={"text"} id={"surnameInput"} name={"surname"} value={surname}
                                   placeholder={"surname"}
                                   onChange={event => this.handleChanges(event)}/>
                            <Button color={"success"} id={"firstSubmit"} onClick={this.submit}><FormattedMessage
                                id={'app.first.submit'}/></Button>
                        </Form>
                    </Row>
                    <Button id={"backFrom1"} onClick={() => {
                        this.props.history.push(routes.index())
                    }}><FormattedMessage id={'app.first.back'}/></Button>
                </Jumbotron>
            </Container>
        )
    }
}

export default connect()(First);