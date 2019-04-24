import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Twitter from '~/src/icons/Twitter';

class Top extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Typography variant="h5" align="center">
                    この声届け、月までも五
                </Typography>
                <div className={classes.messages}>
                    <Typography variant="body1" align="center" className={classes.messages} >
                        Twitter認証を行うとサークル情報を編集できるようになります.
                    </Typography>
                    <Typography variant="body1" align="center" className={classes.messages}>
                        TwitterのAPIキーをサーバーで保存することはありません.
                    </Typography>
                    <Typography align="center" className={classes.messages}>
                        <Button className={classes.button}>
                            <Twitter />
                            <a className={classes.a} href={'/api/auth/twitter'}>
                                Twitterでサインアップ/ログイン
                            </a>
                        </Button>
                    </Typography>
                    <Typography variant="body1" align="center" className={classes.messages}>
                        後ほど設定画面からもTwitter認証を利用できます.
                    </Typography>
                    <Typography align="center" className={classes.messages}>
                        <Button className={classes.nonTwitterButton} >
                            <a className={classes.a} href="/circles">
                                Twitter認証をせずに利用
                            </a>
                        </Button>
                    </Typography>
                </div>
            </div>
        )
    }
}

const styles = theme => ({
    messages: {
        padding: theme.spacing.unit,
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
});

export default withStyles(styles)(Top);
