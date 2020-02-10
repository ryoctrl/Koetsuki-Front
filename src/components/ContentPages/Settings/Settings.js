import React, { Component } from 'react';
import { Button, Typography, FormControlLabel, Radio } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Twitter from '~/src/icons/Twitter';
import { orange/*, green, pink, blue, yellow */} from '@material-ui/core/colors';
import { connect } from 'react-redux';
import CircleMapper from '~/src/stores/mappers/CircleMapper';
import { checkAuth } from '~/src/stores/actions/UserAction';
import Img from 'react-image';


class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: 'yukari'
        }
        this.props.dispatch(checkAuth());
    }
    onChangeColor = (e) => {
        this.setState({
            theme: e.target.value
        });
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Img className={classes.topImage} src="https://koetsuki.mosin.jp/api/images/top.jpg"/>
                <Typography variant="h6" align="center" className={classes.messages}>
                    - Twitter -
                </Typography>
                <Typography align="center" className={classes.messages}>
                    <Button className={classes.button}>
                        <Twitter />
                        <a className={classes.a} href={'/api/auth/twitter'}>
                            Twitterで連携
                        </a>
                    </Button>
                </Typography>
                {/*
                <Typography variant="h6" align="center" className={classes.messages}>
                    - ColorTheme(未実装) -
                </Typography>
                <Typography variant="h6" align="center" className={classes.messages}>
                    <FormControlLabel
                        value="yukari"
                        checked={this.state.theme === 'yukari'}
                        control={<Radio 
                            color="primary"
                            onChange={this.onChangeColor}
                        />}
                        label="ゆかり"
                        labelPlacement="bottom"
                    />
                    <FormControlLabel
                        value="akari"
                        checked={this.state.theme === 'akari'}
                        control={<Radio 
                            classes={{
                                root: classes.akariRoot,
                                checked: classes.akariChecked,
                            }}
                            onChange={this.onChangeColor}
                        />}
                        label="あかり"
                        labelPlacement="bottom"
                    />
                </Typography>
                */}
                <Typography variant="h6" align="center" className={classes.messages}>
                    - Special Thanks -
                </Typography>
                <Typography variant="body" align="center" className={classes.messages}>
                    アプリイメージ・No Image 画像提供
                </Typography>
                <Typography variant="h5" align="center" className={classes.messages}>
                    ミルキャラ様(<a className={classes.aLink} href="https://twitter.com/milcara">@milcara</a>)
                </Typography>
                <Typography variant="h6" align="center" className={classes.messages}>
                    - アンケートのお願い -
                </Typography>
                <Typography variant="body" aign="center" className={classes.messagesCenter}>
                    <a href="https://forms.gle/HfSD9eQhWa3ix9Rt6">一般参加者様向けアンケート</a>
                </Typography>
                <Typography variant="body" fontWeight="fontWeightBold" aign="center" className={classes.messagesCenter}>
                    <a href="https://forms.gle/MnNKsz7G6RVjfvBa6">サークル主様向けアンケート</a>
                </Typography>
            </div>
        )
    }
}

const styles = theme => ({
    topImage: {
        display: 'block',
        margin: '0 auto',
        width: '100%',
        [theme.breakpoints.up('lg')]: {
            width: '45vw',
        },
    },
    messages: {
        padding: theme.spacing.unit,
    },
    messagesCenter: {
        padding: theme.spacing.unit,
        textAlign: 'center',
    },
    button: {
        background: '#1da1f2',
        padding: theme.spacing.unit,
        '&:hover': {
            background: '#0a99b0'
        }
    },
    nonTwitterButton: {
        background: theme.palette.primary.light,
        '&:hover': {
            background: theme.palette.primary.dark
        }
    },
    a: {
        textDecoration: 'none',
        color: 'white'
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
    akariRoot: {
        color: orange[700],
        '&$checked': {
            color: orange[500],
        },
    },
    aLink: {
        textDecoration: 'none',
    },
    akariChecked: {
        color: orange[700],
        '&$checked': {
            color: orange[500],
        },
    }
});

Settings = connect(CircleMapper)(Settings);
export default withStyles(styles)(Settings);
