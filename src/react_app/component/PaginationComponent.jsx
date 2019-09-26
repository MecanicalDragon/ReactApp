import React, {Component, Fragment} from 'react';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import {injectIntl} from 'react-intl';
import PropTypes from 'prop-types';

class PaginationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: this.props.activePage,
            firstPaginationNumber: 1
        };
        this.pages = this.getNumberOfPages(this.props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.activePage !== prevState.activePage) {
            this.setState({
                activePage: this.props.activePage
            });
            this.handlePaginationNumber(this.props.activePage);
        }
    }

    componentWillReceiveProps(props) {
        this.pages = this.getNumberOfPages(props);
        this.forceUpdate();
    }

    getNumberOfPages(props) {
        const auxPages = props.totalItems / props.pageSize;
        let pages = parseInt(auxPages, 10);
        pages += pages !== auxPages ? 1 : 0;
        return pages;
    }

    paginationItems() {
        let items = [];
        this.lastPaginationNumber = this.getLastPaginationNumber();
        items.push(this.firstOrLastPagItem(this.props.firstName, 1));
        items.push(this.nextOrPreviousPagItem(this.props.previousName, 1, 'l'));
        for (let i = this.state.firstPaginationNumber; i <= this.lastPaginationNumber; i++) {
            items.push(this.numberedPagItem(i));
        }
        items.push(this.nextOrPreviousPagItem(this.props.nextName, this.pages, 'r'));
        items.push(this.firstOrLastPagItemCopiedBecauseOfTitles(this.props.lastName, this.pages));
        return items;
    }

    getLastPaginationNumber() {
        const minNumberPages = Math.min(this.pages, this.props.maxPaginationNumbers);
        return this.state.firstPaginationNumber + minNumberPages - 1;
    }

    numberedPagItem(i) {
        let {intl} = this.props;
        return (
            <PaginationItem key={i} id={`pagebutton${i}`} active={this.state.activePage === i}
                            onClick={this.handleClick} title={intl.formatMessage({id: 'app.pagination.page'}) + i}>
                <PaginationLink style={{minWidth: '43.5px'}}>
                    {i}
                </PaginationLink>
            </PaginationItem>
        )
    }

    nextOrPreviousPagItem(name, page, direction) {
        let {intl} = this.props;
        return (
            <PaginationItem key={name} disabled={this.state.activePage === page} title={intl.formatMessage
            (direction === 'r' ? {id: 'app.pagination.next'} : {id: 'app.pagination.prev'})}
                            onClick={(e) => this.handleSelectNextOrPrevious(direction)}>
                <PaginationLink>
                    {name}
                </PaginationLink>
            </PaginationItem>
        )
    }

    firstOrLastPagItem(name, page) {
        let {intl} = this.props;
        let event = {
            currentTarget: {
                getAttribute: () => `pagebutton${page}`
            }
        };
        return (
            <PaginationItem key={name} disabled={this.state.activePage === page}
                            title={intl.formatMessage({id: 'app.pagination.first'})}
                            onClick={() => this.handleClick(event)}>
                <PaginationLink>
                    {name}
                </PaginationLink>
            </PaginationItem>
        )
    }

    firstOrLastPagItemCopiedBecauseOfTitles(name, page) {
        let {intl} = this.props;
        let event = {
            currentTarget: {
                getAttribute: () => `pagebutton${page}`
            }
        };
        return (
            <PaginationItem key={name} disabled={this.state.activePage === page}
                            title={intl.formatMessage({id: 'app.pagination.last'})}
                            onClick={() => this.handleClick(event)}>
                <PaginationLink>
                    {name}
                </PaginationLink>
            </PaginationItem>
        )
    }

    handleClick(event) {
        const newActivePage = parseInt(event.currentTarget.getAttribute("id").split("pagebutton").pop(), 10);
        this.setState({
            activePage: newActivePage
        });
        this.handlePaginationNumber(newActivePage);
        this.props.onSelect(newActivePage);
    }

    handleSelectNextOrPrevious(direction) {
        const activePage = this.state.activePage;
        if ((direction === 'r' && activePage === this.pages) || (direction === 'l' && activePage === 1))
            return;

        const newActivePage = direction === 'r' ? activePage + 1 : activePage - 1;

        this.setState({
            activePage: newActivePage
        });

        this.handlePaginationNumber(newActivePage);
        this.props.onSelect(newActivePage);
    }

    handlePaginationNumber(activePage) {
        const distance = Math.floor(this.props.maxPaginationNumbers / 2);
        const newFPNumber = activePage - distance;
        const newLPNumber = activePage + distance;
        if (newFPNumber < distance) {
            if (this.state.firstPaginationNumber !== 1) {
                this.setState({
                    firstPaginationNumber: 1
                })
            }
        } else if (newFPNumber === distance) {
            this.setState({
                firstPaginationNumber: newFPNumber
            })
        } else if (newLPNumber <= this.pages) {
            this.setState({
                firstPaginationNumber: newFPNumber
            })
        } else if (newLPNumber >= this.pages) {
            this.setState({
                firstPaginationNumber: this.pages - this.props.maxPaginationNumbers + 1
            })
        }
    }

    render() {
        if (this.props.totalItems !== 0) {
            return (
                <Fragment>
                    <Pagination>
                        {this.paginationItems()}
                    </Pagination>
                    <p>{this.props.intl.formatMessage({id: 'app.pagination.total'}) + this.props.totalItems}</p>
                </Fragment>
            )
        } else return null
    }
}

PaginationComponent.propTypes = {
    totalItems: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
    maxPaginationNumbers: PropTypes.number,
    activePage: PropTypes.number
};

PaginationComponent.defaultProps = {
    maxPaginationNumbers: 5,
    activePage: 1,
    firstName: "|<",
    lastName: ">|",
    nextName: ">>",
    previousName: "<<"
};

export default injectIntl(PaginationComponent);
