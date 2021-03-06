import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {FormattedMessage} from 'react-intl';
import {
    Container
} from 'reactstrap';

import {setNavPosition} from '@/reducer/actions';
import {paths} from '@/constants/paths'

class BreadCrump extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {navPosition} = this.props.state;
        let currentPageProperty = paths[navPosition] || {};
        const pathElements = currentPageProperty.pathElements || [];

        return (
            <Container style={{paddingTop: "6px", paddingBottom: 0}}>
                <ol className="breadcrumb">
                    {
                        pathElements.map((e, index) => {
                            const prevElement = paths[e];
                            return (
                                <Fragment>
                                    <li key={index}><a href="#" onClick={
                                        (event) => {
                                            event.preventDefault();
                                            this.props.history.push(prevElement.link,
                                                this.props.history.location.state)
                                        }
                                    }><FormattedMessage id={prevElement.formattedId}/></a></li>
                                    {
                                        index === pathElements.length ? null : " > "
                                    }
                                </Fragment>
                            )
                        })
                    }
                    <li className="active"><FormattedMessage id={currentPageProperty.formattedId}/></li>
                </ol>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return ({
        state: state.navPosition
    })
};

const mapDispatchToProps = dispatch => ({
    setNavPosition: position => dispatch(setNavPosition(position))
});


export default connect(mapStateToProps, mapDispatchToProps)(BreadCrump);