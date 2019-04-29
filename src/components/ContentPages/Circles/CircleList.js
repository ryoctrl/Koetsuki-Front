import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { Link, withRouter } from 'react-router-dom';

import { Grid, CircularProgress } from '@material-ui/core';

import CircleMapper from '~/src/stores/mappers/CircleMapper';
import CircleCard from '~/src/components/common/CircleCard';
import { getCircles } from '~/src/stores/actions/CircleAction';
import { checkAuth } from '~/src/stores/actions/UserAction';
import { getScrollCircles } from '~/src/stores/actions/ScrollAction';

import moment from 'moment';

import InfiniteScroll from 'react-infinite-scroller';

class CircleList extends Component {
    constructor(props) {
        super(props);
        const { circles, results } = this.props;
        let displayingCircles = results || circles;
        const cards = displayingCircles.slice(0, 20);
        this.state = {
            hasMoreItems: true,
            displayingCircles: displayingCircles,
            cards: cards,
            displayAll: true
        };

        this.storeInit();
    }

    storeInit() {
        this.props.dispatch(checkAuth());
        if(this.props.lastUpdated) {
            const ts = moment(this.props.lastUpdated);
            const now = moment();
            const diffSec = now.diff(ts, 'seconds');
            if(diffSec < 30) return;
        }
        this.props.dispatch(getCircles());
    }

    loadItems(page) {
        const { circles, results } = this.props;
        let displayingCircles = circles;
        let displayingAll = true;
        if(results) {
            displayingCircles = results;
            displayingAll = false;
        } 

        let targetIndex = this.state.cards.length + 20;
        let hasMoreItems = this.state.hasMoreItems;

        if(this.state.displayingAll !== displayingAll) {
            targetIndex = 20;
        } else if(targetIndex > displayingCircles.length) {
            targetIndex = displayingCircles.length;
            hasMoreItems = false;
        }

        let newCards = displayingCircles.slice(0, targetIndex);
        this.setState({
            cards: newCards,
            hasMoreItems,
            displayingAll,
            shouldUpdate: false
        });
    }

    componentWillMount() {
        window.addEventListener('scroll', this.scrollListener, true);
    }

    shouldComponentUpdate(np, ns) {
        const newSearch = !this.props.results && np.results;
        const check = (oldAry, newAry) => {
            if(!oldAry || !newAry) return false;
            if(oldAry.length !== newAry.length) return true;

            for(const index in oldAry) {
                if(oldAry[index] !== newAry[index]) {
                    return true;
                }
            }
            return false;
        };
        const updateSearch = this.props.results === undefined || np.results === undefined ? false : check(this.props.results, np.results);
        if(newSearch || updateSearch) {
            this.setState({
                shouldUpdate: true,
                hasMoreItems: true
            });
        }
        const hided = this.props.location.pathname !== '/circles' && np.location.pathname === '/circles';
        const y = np.scroll.circleList.y;
        const shouldRecover = hided && y;
        if(!shouldRecover) return true;

        setTimeout(() => window.scrollTo(0, y), 100);
        return true;
    }

    scrollListener = () => {
        const y = window.scrollY;
        if(this.props.location.pathname !== '/circles') return;
        this.props.dispatch(getScrollCircles(y));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollListener);
    }

    render() {
        let { classes, circles, isFetching, results } = this.props;
        const hide = this.props.location.pathname !== '/circles';
        if(this.state.shouldUpdate) this.loadItems(0);
        let displayingCircles = circles;
        let nonCirclesMessage = 'サークルが1件もないか取得できませんでした...';
        if(results) {
            displayingCircles = results;
            nonCirclesMessage = 'サークルが1件も見つかりませんでした...';
        }

        if(displayingCircles.length === 0) {
            if(isFetching) {
                return (
                    <CircularProgress className={(hide ? classes.hideRoot : classes.progress)} color="primary"/>
                )
            } else {
                return (
                    <p>{nonCirclesMessage}</p>
                )
            }
        }

        displayingCircles = [];
        this.state.cards.map(circle => {
            displayingCircles.push(
                <Grid key={circle.id} item xs={6} lg={3} className={classes.card}>
                    <CircleCard component={Link} to={`/circles/${circle.id}`} circle={circle} />
                </Grid>
            );
            return null;
        });


        const loader = <CircularProgress key="loader" className={'loader'} color="primary"/>;
        return (
            <InfiniteScroll loadMore={this.loadItems.bind(this)} hasMore={this.state.hasMoreItems} loader={loader} threshold={600} className={(hide ? classes.hideRoot: classes.displayRoot)}>
                <Grid container className={classes.list} spacing={24}>
                    {displayingCircles}
                </Grid>
            </InfiniteScroll>
        )
    }
}


const styles = theme => ({
    hideRoot: {
        display: 'none'
    },
    displayRoot: {
    },
    card: {
        width: '100%',
    },
    list: {
        paddingTop: '5px'
    },
    progress: {
        position: 'absolute',
        top: '0px',
        right: '0px',
        left: '0px',
        bottom: '0px',
        margin: 'auto',
        width: theme.spacing.unit * 8,
        height: theme.spacing.unit * 8,
    }
});

CircleList = withStyles(styles)(CircleList);
CircleList = connect(CircleMapper)(CircleList);
CircleList = withRouter(CircleList);

export default CircleList;
