import React from 'react';
import { View } from 'react-native';
import { connectField } from 'uniforms';
import { TextInput, HelperText } from 'react-native-paper';
const LongText = ({ disabled, error, errorMessage, helperText, inputRef, label, name, onChange, placeholder, readOnly, showInlineError, value = '', ...props }) => {
    let formHelperText = (error && showInlineError && errorMessage) || helperText;
    let helperProps = {
        type: showInlineError && error ? 'error' : 'info',
    };
    return (React.createElement(View, null,
        React.createElement(TextInput, { disabled: disabled || readOnly, error: !!error, label: `${label}${props.required ? ' *' : ''}`, dense: true, multiline: true, onChangeText: (text) => disabled || onChange(text), placeholder: placeholder, ref: inputRef, value: value, ...props }),
        !!formHelperText && (React.createElement(HelperText, { ...helperProps }, formHelperText))));
};
export default connectField(LongText, { kind: 'leaf' });
