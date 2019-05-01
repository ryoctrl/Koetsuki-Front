import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import CircleMapper from '~/src/stores/mappers/CircleMapper';

import { Link } from 'react-router-dom';

import { Grid, CircularProgress } from '@material-ui/core';

import CircleCard from '~/src/components/common/CircleCard';

import { getFav } from '~/src/stores/actions/FavoriteAction';
import { checkAuth } from '~/src/stores/actions/UserAction';


import InfiniteScroll from 'react-infinite-scroller';

class Favorites extends Component {
    constructor(props) {
        super(props);
        const { circles, results, favorites } = this.props;
        const displayCircles = [];
        for(const fav of favorites.slice(0, 20)) {
            let c = circles.filter(c => c.id === fav.circleId);
            if(!c || !c[0]) continue;
            c = c[0];
            if(!results || results.length === circles.length) {
                displayCircles.push(c);
                continue;
            }
            c = results.filter(r => r.id === c.id);
            if(!c[0]) continue;
            displayCircles.push(c[0]);
        }

        this.state = {
            hasMoreItems: true,
            favorites: displayCircles,
            displayingAll: true
        }
        this.props.dispatch(getFav(this.props.favorites, this.props.user));
        this.props.dispatch(checkAuth());
    }

    loadItems(page, passedFavorites, passedResults) {
        const { circles, results, favorites } = this.props;

        //まずは全サークルで初期化
        let displayTargetAry = circles;
        let displayingAll = true;

        //検索結果(props.results)、または新たな検索結果(passesResults)が渡された場合に検索対象を変更
        if(passedResults) {
            displayTargetAry = passedResults;
            displayingAll = false;
        } else if(results) {
            displayTargetAry = results;
            displayingAll = false;
        } 


        //Search対象をNoneにするとresultsに全サークルが入った状態になるので数を見てどうするかを選択
        if(displayTargetAry.length === circles.length) {
            displayTargetAry = circles;
            displayingAll = true;
        }

        let targetIndex = this.state.favorites.length + 20;
        let hasMoreItems = this.state.hasMoreItems;
        if(this.state.displayingAll !== displayingAll || (!this.state.displayingAll && !displayingAll)) {
            targetIndex = 20;
            hasMoreItems = true;
        } else if(targetIndex > displayTargetAry.length){
            targetIndex = displayTargetAry.length;
            hasMoreItems = false;
        } else  if(targetIndex > favorites.length) {
            targetIndex = favorites.length;
            hasMoreItems = false;
        }

        let currentDisplayFavs = page !== -1 ? favorites.slice(0, targetIndex + 20) : passedFavorites.slice(0, targetIndex);
        currentDisplayFavs = displayingAll ? currentDisplayFavs : favorites;
        if(currentDisplayFavs.length === favorites.length) hasMoreItems = false;


        const displayCircles = [];
        for(const fav of currentDisplayFavs) {
            let c = displayTargetAry.filter(c => c.id === fav.circleId);
            if(!c || !c[0]) continue;
            displayCircles.push(c[0]);
        }

        this.setState({
            favorites: displayCircles,
            hasMoreItems,
            displayingAll
        });
    }

    shouldComponentUpdate(np, ns) {
        if(this.props.favorites.length !== np.favorites.length) this.loadItems(-1, np.favorites);
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

            this.loadItems(-1, np.favorites, np.results);
        }
        return true;
    }

    render() {
        const { classes } = this.props;
        const displayCircles = [];
        this.state.favorites.map(circle => {
            displayCircles.push(
                <Grid key={circle.id} item xs={6} lg={3} className={classes.card}>
                    <CircleCard component={Link} to={`/circles/${circle.id}`} circle={circle} />
                </Grid>
            );
            return null;
        });

        const loader = <CircularProgress key="loader" className={'loader'} color="primary" />;
        return (
            <InfiniteScroll loadMore={this.loadItems.bind(this)} hasMore={this.state.hasMoreItems} loader={loader} threshold={600}>
                <Grid container spacing={24}>
                    {displayCircles}
                </Grid>
            </InfiniteScroll>
        )
    }
}

const styles = theme => ({
    card: {
        width: '100%'
    },
});

Favorites = withStyles(styles)(Favorites);

export default connect(CircleMapper)(Favorites);
