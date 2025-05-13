import React from 'react';
import { View } from 'react-native';
import { connectField } from 'uniforms';
import { TextInput, HelperText } from 'react-native-paper';
function Text({ disabled, error, errorMessage, helperText, inputRef, label, name, onChange, placeholder, readOnly, showInlineError, value = '', ...props }) {
    let formHelperText = (error && showInlineError && errorMessage) || helperText;
    let helperProps = {
        type: showInlineError && error ? 'error' : 'info',
    };
    return props.field.multiline ? (React.createElement(View, { style: {
            flex: 1,
            marginBottom: 8,
        } },
        React.createElement(TextInput, { mode: "outlined", multiline: true, disabled: disabled || readOnly, error: !!error, label: `${label}${props.required ? ' *' : ''}`, onChangeText: (text) => disabled || onChange(text), placeholder: placeholder, ref: inputRef, value: value, style: { backgroundColor: 'transparent', minHeight: 100 }, outlineColor: "#462A82", activeOutlineColor: "#462A82", ...props }),
        !!formHelperText && (React.createElement(HelperText, { ...helperProps }, formHelperText)))) : (React.createElement(View, { style: {
            flex: 1,
            marginBottom: 8,
        } },
        React.createElement(TextInput, { mode: "outlined", disabled: disabled || readOnly, error: !!error, label: `${label}${props.required ? ' *' : ''}`, dense: true, onChangeText: (text) => disabled || onChange(text), placeholder: placeholder, ref: inputRef, value: value, style: { backgroundColor: 'transparent' }, outlineColor: "#462A82", activeOutlineColor: "#462A82", ...props }),
        !!formHelperText && (React.createElement(HelperText, { ...helperProps }, formHelperText))));
}
export default connectField(Text, { kind: 'leaf' });
