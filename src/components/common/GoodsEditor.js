import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { Button, Radio, FormControlLabel } from '@material-ui/core';

import { createGoods, updateGoods } from '~/src/stores/actions/GoodsAction';

import { reduxForm, Field } from 'redux-form';

import FileForm from '~/src/components/forms/FileForm';
import TextForm from '~/src/components/forms/TextForm';
import RadioForm from '~/src/components/forms/RadioForm';

import { GoodsValidator } from '~/src/components/forms/validators/GoodsValidator';
import CircleMapper from '~/src/stores/mappers/CircleMapper';

class GoodsEditor extends Component {
    submit = (values) => {
        console.log(values);
        const file = values['goodsimage-' + this.props.form];
        console.log('goodsimage-' + this.props.form);
        console.log(file);
        const params = new FormData();
        params.append('name', values.name);
        params.append('price', values.price);
        params.append('image', file);
        params.append('isNew', values.isNew);
        if(this.goods) {
            params.append('goodsId', this.goods.id);
            this.props.updateGoods(params);
        } else {
            params.append('circleId', this.circle.id); 
            this.props.createGoods(params);
        }
    }

    render() {
        const { classes, handleSubmit, submitting, circle, goods, form} = this.props;
        this.circle = circle;
        this.goods = goods;

        return (
            <form onSubmit={handleSubmit(this.submit)} encType="multipart/form-data">
                <Field
                    name="name"
                    label="作品タイトル"
                    component={TextForm}
                    classes={classes}
                    rootClass={classes.formControl}
                    required />
                <Field 
                    name="price"
                    label="頒布価格"
                    component={TextForm}
                    type="number"
                    InputProps={{ inputProps: {min: 0}}}
                    classes={classes}
                    rootClass={classes.formControl}
                    required />
                <Field 
                    name="isNew"
                    label="頒布種別"
                    component={RadioForm}
                    classes={classes}
                    rootClass={classes.formControl}
                    required>
                    <FormControlLabel value="true" control={<Radio />} label="新刊"/>
                    <FormControlLabel value="false" control={<Radio />} label="既刊" />
                </Field>
                <Field
                    name={'goodsimage-' + form}
                    label='頒布物イメージ'
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
                    disabled={submitting}
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

GoodsEditor = connect(CircleMapper, { createGoods, updateGoods })(GoodsEditor);
GoodsEditor = reduxForm({
    validate: GoodsValidator,
})(GoodsEditor);

export default withStyles(styles)(GoodsEditor);
