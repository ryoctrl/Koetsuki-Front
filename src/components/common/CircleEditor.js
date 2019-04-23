import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { Button, } from '@material-ui/core';

import { createCircle, updateCircle } from '~/src/stores/actions/CircleAction';

import { reduxForm, Field } from 'redux-form';

import FileForm from '~/src/components/forms/FileForm';
import TextForm from '~/src/components/forms/TextForm';

import { CircleValidator } from '~/src/components/forms/validators/CircleValidator';
import CircleMapper from '~/src/stores/mappers/CircleMapper';

class CircleEditor extends Component {
    submit = (values) => {
        console.log('Circle Submitting');
        console.log(values);
        const params = new FormData();
        params.append('name', values.name);
        params.append('penName', values.penName);
        params.append('spaceName', values.spaceName);
        params.append('twitter', values.twitter);
        params.append('image', values.image);
        // サークルアップデート or 新規作成
        if(this.circle) {
            params.append('circleId', this.circle.id);
            this.props.updateCircle(params);
        } else {
            this.props.createCircle(params);
        }
    }

    render() {
        const { classes, handleSubmit, submitting,  circle } = this.props;
        this.circle = circle;

        return (
            <form className={classes.form}onSubmit={handleSubmit(this.submit)} encType="multipart/form-data">
                <Field
                    name="name"
                    label="サークル名"
                    value={circle.name}
                    component={TextForm}
                    classes={classes}
                    rootClass={classes.formControl}
                    required />
                <Field
                    name="penName"
                    label="ペンネーム"
                    value={circle.penName}
                    component={TextForm}
                    classes={classes}
                    rootClass={classes.formControl}
                    required />
                <Field 
                    name="twitter"
                    label="TwitterID"
                    value={circle.twitter}
                    component={TextForm}
                    classes={classes}
                    rootClass={classes.formControl}/>
                <Field
                    name="spaceName"
                    label="スペース"
                    value={circle.spaceName}
                    component={TextForm}
                    classes={classes}
                    rootClass={classes.formControl}
                    required />
                <Field
                    name='image' 
                    label='サークルイメージ' 
                    accept='image/*' 
                    component={FileForm} 
                    classes={classes}
                    rootClass={classes.formControl} 
                    required />
                <Button 
                    type="submit" 
                    size="medium" 
                    variant="contained" 
                    color="primary"
                    disabled={ submitting}
                    className={classes.formControl}>
                    Submit
                </Button>
            </form>
        )
    }
}

const styles = theme => ({
    root: {
        width: '95%',
        margin: theme.spacing.unit
    },
    formControl: {
        display: 'block',
        width: '95%',
        margin: theme.spacing.unit,
    },
    button: {
        width: '100%',
    }
});

CircleEditor = connect(CircleMapper, { createCircle, updateCircle })(CircleEditor);
CircleEditor = reduxForm({
    form: 'circleForm',
    validate: CircleValidator,
})(CircleEditor);

export default withStyles(styles)(CircleEditor);
