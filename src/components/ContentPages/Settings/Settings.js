import React, { Component } from 'react';
import { Button, Typography, FormControlLabel, Radio } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Twitter from '~/src/icons/Twitter';
import { orange/*, green, pink, blue, yellow */} from '@material-ui/core/colors';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: 'yukari'
        }
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
                <Typography variant="h6" align="center" className={classes.messages}>
                    Twitter
                </Typography>
                <Typography align="center" className={classes.messages}>
                    <Button className={classes.button}>
                        <Twitter />
                        <a className={classes.a} href="/api/auth/twitter">
                            Twitterでサインアップ/ログイン
                        </a>
                    </Button>
                </Typography>
                <Typography variant="h6" align="center" className={classes.messages}>
                    ColorTheme(未実装)
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
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
    akariRoot: {
        color: orange[700],
        '&$checked': {
            color: orange[500],
        },
    },
    akariChecked: {
        color: orange[700],
        '&$checked': {
            color: orange[500],
        },
    }
});

export default withStyles(styles)(Settings);
