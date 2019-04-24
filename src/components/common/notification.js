import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Snackbar } from '@material-ui/core';
import { CloseIcon } from '@material-ui/icons';

class Notification extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        const open = true;
        return (
            <Snaclbar anchorOrigin={{
                vartical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            ContentProps={{
                'aria-describedby': 'message-id'
            }}
            message={<span>Note archived</span>}
            action={[
                <IconButton key="close" aria-label="close" className={classes.close} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            ]}
            >
            </Snackbar>
        )



    }

}

const styles = theme = ({
    close: {
        padding: theme.spacing.unit / 2,
    }
});

export default withStyles(styles)(Notificaton);
