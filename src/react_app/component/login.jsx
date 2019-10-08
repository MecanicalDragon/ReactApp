import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Jumbotron, Button, Row, Col, Form, Input, FormGroup} from 'reactstrap'
import * as routes from '@/router/routes'
import {setNavPosition} from "@/reducer/actions";
import {Login} from "@/constants/paths";
import {FormattedMessage} from 'react-intl';
import * as AuthenticationService from '@/service/AuthenticationService'

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        if (AuthenticationService.isUserLoggedIn()) {
            document.title = "React App";
            this.props.history.push(routes.index());
        } else {
            document.title = "Login";
            this.props.setNavPosition(Login);
        }
    }

    handleChanges = async (event) => {
        const {target} = event;
        const {name} = target;
        await this.setState({[name]: target.value});
    };

    submitForm = (e) => {
        e.preventDefault();
        let {email, password} = this.state;
        AuthenticationService.login(email, password).then(success => {
            if (success) {
                const {from} = this.props.location.state || {from: {pathname: routes.index()}};
                this.setState({loginError: false});
                document.title = "React App";
                this.props.history.push(from);
            } else {
                this.setState({loginError: true});
            }
        });
    };


    render() {
        let errorMessage = this.state.loginError ?
            <Col style={{color: "red", textAlign: "center"}}>
                <FormattedMessage id='app.login.incorrect'/>
            </Col>
            : undefined;
        const {email, password} = this.state;
        return (
            <Container>
                <Jumbotron>
                    <Row>
                        <Col style={{textAlign: "center"}}>
                            <h1><FormattedMessage id='app.login.header'/></h1>
                        </Col>
                    </Row>
                    <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                        <Row>
                            <Col sx={{size: 1, offset: 5}} style={{textAlign: "right"}}>User:</Col>
                            <Col colSpan={2}>
                                <FormGroup>
                                    <Input type={"email"} id={"nameInput"} name={"email"} value={email}
                                           placeholder={"email"}
                                           onChange={event => this.handleChanges(event)}/>
                                </FormGroup>
                            </Col>
                            <Col sx={{size: 4}}>
                            </Col>
                        </Row>
                        <Row>
                            <Col sx={{size: 1, offset: 5}} style={{textAlign: "right"}}>Password:</Col>
                            <Col colSpan={2}>
                                <FormGroup>
                                    <Input type={"password"} id={"surnameInput"} name={"password"} value={password}
                                           placeholder={"password"}
                                           onChange={event => this.handleChanges(event)}/>
                                </FormGroup>
                            </Col>
                            <Col sx={{size: 4}}>
                            </Col>
                        </Row>
                        <Row style={{height: 35}}>
                            {errorMessage}
                        </Row>
                        <Row>
                            <Col style={{textAlign: "center"}}>
                                <Button style={{backgroundColor: "#e20074", borderColor: "white"}}><FormattedMessage
                                    id={'app.first.submit'}/></Button>
                            </Col>
                        </Row>
                    </Form>
                </Jumbotron>
            </Container>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setNavPosition: pos => dispatch(setNavPosition(pos)),
});

export default connect(null, mapDispatchToProps)(LoginPage);