import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, FormLabel, Button, FormHelperText } from'@material-ui/core';

const styles = theme => ({
    input: {
        display: 'none',
    },
    button: {
        marginTop: 10,
    }
});

export default withStyles(styles)(({
    input: { value, name, onChange },
    label,
    meta: { touched, error } ,
    classes,
    onFieldChange,
    buttonLabel,
    accept = '*',
    required = false,
    rootClass = '',
}) => (
    <FormControl 
        classes={classes}
        required={required} 
        component='fieldset' 
        error={!!(touched && error)}>

        <FormLabel component='legend'>{label}</FormLabel>
        <input
            accept={accept}
            className={classes.input}
            id={name}
            type='file'
            onChange={e => {
                e.preventDefault()
                onChange(e.target.files[0])
                onFieldChange && onFieldChange(e.target.files[0])
            }}
            onBlur={() => {}}
        />
        <label htmlFor={name}>
            <Button 
                classes={{root: classes.button}} 
                variant='outlined' 
                component='span'>
                {buttonLabel || 'ファイルを選択'}
            </Button>
      </label>
      <label>{value && value.name}</label>
        {touched && error && <FormHelperText>{error}</FormHelperText>}
</FormControl>
));
