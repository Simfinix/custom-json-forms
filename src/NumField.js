import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { connectField, useForm } from 'uniforms';
import { TextInput, HelperText } from 'react-native-paper';
function Num({ disabled, error, errorMessage, helperText, inputRef, label, name, onChange, placeholder, readOnly, showInlineError, value = '', ...props }) {
    const [totalSum, setTotalSum] = useState(0);
    const context = useForm();
    const formHelperText = (error && showInlineError && errorMessage) || helperText;
    const helperProps = {
        type: showInlineError && error ? 'error' : 'info',
    };
    useEffect(() => {
        let values = context?.model;
        let count = 0;
        for (const key in values) {
            const value = values[key];
            if (typeof value === 'object' && value?.hasOwnProperty('value')) {
                count += value.value;
            }
        }
        setTotalSum(count);
    }, [context.model]);
    useEffect(() => {
        onChange(parseFloat(totalSum.toString()));
    }, [totalSum]);
    return props.field.function ? (React.createElement(View, { style: {
            flex: 1,
            marginBottom: 8,
        } },
        React.createElement(TextInput, { mode: "outlined", keyboardType: "numeric", editable: false, error: !!error, label: `${label}${props.required ? ' *' : ''}`, dense: true, placeholder: placeholder, ref: inputRef, value: !!totalSum ? `${totalSum}` : '0', onChangeText: () => disabled || onChange(parseFloat(totalSum.toString())), style: { backgroundColor: 'transparent' }, outlineColor: "#462A82", activeOutlineColor: "#462A82", ...props }),
        !!formHelperText && (React.createElement(HelperText, { ...helperProps }, formHelperText)))) : (React.createElement(View, { style: {
            flex: 1,
            marginBottom: 8,
        } },
        React.createElement(TextInput, { mode: "outlined", keyboardType: "numeric", disabled: disabled || readOnly, error: !!error, label: `${label}${props.required ? ' *' : ''}`, dense: true, onChangeText: (text) => disabled || onChange(parseFloat(text)), placeholder: placeholder, ref: inputRef, value: !!value ? `${value}` : undefined, style: { backgroundColor: 'transparent' }, outlineColor: "#462A82", activeOutlineColor: "#462A82", ...props }),
        !!formHelperText && (React.createElement(HelperText, { ...helperProps }, formHelperText))));
}
export default connectField(Num, { kind: 'leaf' });
