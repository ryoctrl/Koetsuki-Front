import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormHelperText } from'@material-ui/core';

export default ({
    input: { value, onChange },
    label,
    children,
    meta: { touched, error },
    onFieldChange,
    row = true,
    required = false,
    classes = '',
    rootClass = '',
}) => (
    <FormControl 
        classes={classes} 
        required={required} 
        component='fieldset' 
        error={!!(touched && error)}>
        <FormLabel component='legend'>{label}</FormLabel>
        <RadioGroup
            row={row}
            value={value}
            onChange={(e) => {
                onChange(e.target.value)
                onFieldChange && onFieldChange(e.target.value)
            }}
        >
            {children}
        </RadioGroup>
        {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
)
