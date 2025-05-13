import { View } from 'react-native';
import { HelperText } from 'react-native-paper';
import React, { createElement } from 'react';
export default function wrapField({ component, disabled, error, errorMessage, fullWidth, helperText, margin, readOnly, required, showInlineError, variant, }, ...children) {
    let formHelperText = showInlineError && error ? errorMessage : helperText;
    let props = {
        component,
        disabled: !!disabled,
        error: !!error,
        fullWidth: !!fullWidth,
        margin,
        readOnly,
        required,
        variant,
        style: {
            marginBottom: 8,
        },
    };
    let helperProps = {
        visible: !!formHelperText,
        type: showInlineError && error ? 'error' : 'info',
    };
    return createElement(View, props, ...children, !!formHelperText && (React.createElement(HelperText, { ...helperProps }, formHelperText)));
}
