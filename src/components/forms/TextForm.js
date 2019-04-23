import React from 'react';
import { TextField } from'@material-ui/core';

export default ({
    input,
    label,
    meta: { touched, error },
    type='text',
    required = false,
    classes = '',
    rootClass = '',
}) => (
    <TextField
        required={required}
        classes={classes}
        error={!!(touched && error)}
        label={label}
        type={type}
        variant="outlined"
        helperText={touched && error}
        {...input}
    />
);
