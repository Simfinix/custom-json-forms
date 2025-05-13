import React from 'react';
import { View } from 'react-native';
import { connectField } from 'uniforms';
import { Checkbox, HelperText, Switch, Text, useTheme, } from 'react-native-paper';
function Bool({ appearance, disabled, label, onChange, readOnly, transform, value, error, showInlineError, helperText, errorMessage, ...props }) {
    let theme = useTheme();
    let formHelperText = (error && showInlineError && errorMessage) || helperText;
    let helperProps = {
        visible: !!formHelperText,
        type: showInlineError && error ? 'error' : 'info',
        children: formHelperText,
    };
    return (React.createElement(View, { style: { flex: 1, marginBottom: 8 } },
        React.createElement(View, { style: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignContent: 'center',
                alignItems: 'center',
            } },
            appearance === 'checkbox' || appearance === undefined ? (React.createElement(Checkbox, { disabled: disabled, status: !!value ? 'checked' : 'unchecked', onPress: () => {
                    !disabled && !readOnly && onChange && onChange(!value);
                } })) : (React.createElement(Switch, { disabled: disabled, value: !!value, onValueChange: () => {
                    !disabled && !readOnly && onChange && onChange(!value);
                } })),
            React.createElement(Text, { style: {
                    color: !!error ? theme.colors.error : theme.colors.text,
                } }, `${transform ? transform(label) : label}${props.required ? ' *' : ''}`)),
        !!formHelperText && React.createElement(HelperText, { ...helperProps })));
}
export default connectField(Bool, {
    kind: 'leaf',
});
