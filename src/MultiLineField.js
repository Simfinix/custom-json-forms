import React from 'react';
import { View } from 'react-native';
import { connectField } from 'uniforms';
import { TextInput, HelperText } from 'react-native-paper';
function Text({ disabled, error, errorMessage, helperText, inputRef, label, name, onChange, placeholder, readOnly, showInlineError, value = '', ...props }) {
    const formHelperText = (error && showInlineError && errorMessage) || helperText;
    const helperProps = {
        type: showInlineError && error ? 'error' : 'info',
    };
    return (React.createElement(View, { style: {
            flex: 1,
            marginBottom: 8,
        } },
        React.createElement(TextInput, { mode: "flat", disabled: disabled || readOnly, multiline: true, error: !!error, label: `${label}${props.required ? ' *' : ''}`, dense: true, onChangeText: (text) => disabled || onChange(text), placeholder: placeholder, ref: inputRef, value: value, style: { backgroundColor: 'red' }, underlineStyle: {
                width: '90%',
                height: 1.5,
                backgroundColor: '#462A82',
                bottom: 0,
                left: '5%',
            }, activeUnderlineColor: "#462A82", ...props }),
        !!formHelperText && (React.createElement(HelperText, { ...helperProps }, formHelperText))));
}
export default connectField(Text, { kind: 'leaf' });
