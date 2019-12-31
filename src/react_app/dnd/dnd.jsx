import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Jumbotron, Button} from 'reactstrap'
import * as routes from '@/router/routes'
import {setNavPosition} from '@/reducer/actions'
import {dnd} from '@/constants/paths'
import {FormattedMessage} from 'react-intl';
import initialData from "@/dnd/initData";
import DragPool from './dragpool'

import styled from "styled-components";
import {DragDropContext} from "react-beautiful-dnd";

const Container = styled.div`
display: flex;
`;


class Dnd extends Component {

    constructor(props) {
        super(props);
        this.props.dispatch(setNavPosition(dnd));
        this.state = {
            ...initialData
        }
    }


    onDragEnd = result => {

        const {destination, source, draggableId} = result;
        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        if (start === finish) {
            const newIds = Array.from(start.heroes);
            newIds.splice(source.index, 1);
            newIds.splice(destination.index, 0, draggableId);
            const newCol = {
                ...start,
                heroes: newIds
            };
            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newCol.id]: newCol
                }
            };
            this.setState(newState)
        } else {
            const startHeroes = Array.from(start.heroes);
            const finishHeroes = Array.from(finish.heroes);

            startHeroes.splice(source.index, 1);
            finishHeroes.splice(destination.index, 0, draggableId);

            const newStart = {
                ...start, heroes: startHeroes
            };
            const newFinish = {
                ...finish, heroes: finishHeroes
            };

            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newStart.id]: newStart,
                    [newFinish.id]: newFinish,
                }
            };
            this.setState(newState);
        }
    };

    render() {
        return (
            <Jumbotron>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Container>
                        {this.state.columnOrder.map(columnId => {
                            const column = this.state.columns[columnId];
                            const heroes = column.heroes.map(heroId => this.state.heroes[heroId]);
                            return <DragPool key={column.id} column={column} heroes={heroes}/>
                        })}
                    </Container>
                </DragDropContext>
                <Button id={"backFromDnd"} onClick={() => {
                    this.props.history.push(routes.pageTwo())
                }}><FormattedMessage id={'app.first.back'}/></Button>
            </Jumbotron>
        )
    }
}

export default connect()(Dnd);