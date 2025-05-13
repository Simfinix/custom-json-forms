import React from 'react';
import { Platform, View } from 'react-native';
import { connectField } from 'uniforms';
import { RadioButton, Text, useTheme } from 'react-native-paper';
import globalColors from './globalColors';
function Radio({ error, label, value, readOnly, disabled, transform, allowedValues, onChange, ...props }) {
    const theme = useTheme();
    const handleValueChange = (newValue) => {
        if (!disabled && !readOnly) {
            onChange(newValue);
        }
    };
    const isSum = props?.field?.sum;
    return isSum ? (React.createElement(View, { style: { flex: 1 } },
        React.createElement(Text, { style: {
                marginTop: 8,
                fontSize: 20,
                color: !!error ? theme.colors.error : theme.colors.text,
            } }, `${label}${props.required ? ' *' : ''}`),
        React.createElement(View, { style: {
                height: 1,
                width: '100%',
                alignSelf: 'center',
                backgroundColor: globalColors.grey.medium,
                marginTop: 0,
                marginBottom: 20,
                borderWidth: 0,
                shadowOffset: { width: 1, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 2,
                elevation: 2,
            } }),
        React.createElement(RadioButton.Group, { onValueChange: handleValueChange, value: value ?? '' }, allowedValues?.map((item, idx) => (React.createElement(View, { key: `${item}-${idx}`, style: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
            } }, Platform.OS === 'ios' ? (React.createElement(React.Fragment, null,
            React.createElement(View, { style: {
                    borderWidth: 0.8,
                    borderRadius: 50,
                    borderColor: theme.dark
                        ? globalColors.defaultLight
                        : globalColors.defaultDark,
                } },
                React.createElement(RadioButton, { value: item, color: theme.dark
                        ? globalColors.defaultLight
                        : globalColors.defaultDark })),
            React.createElement(View, { style: { paddingRight: '5%' } },
                React.createElement(Text, { style: { marginLeft: 15, marginRight: 15 } }, transform ? transform(item.label) : item.label)))) : (React.createElement(React.Fragment, null,
            React.createElement(RadioButton, { value: item, color: theme.dark
                    ? globalColors.defaultLight
                    : globalColors.defaultDark }),
            React.createElement(View, { style: { paddingRight: '5%' } },
                React.createElement(Text, { style: { marginLeft: 15, marginRight: 15 } }, transform ? transform(item.label) : item.label)))))))))) : (React.createElement(View, { style: { flex: 1 } },
        React.createElement(Text, { style: {
                marginTop: 8,
                marginBottom: 8,
                fontSize: 20,
                color: !!error ? theme.colors.error : theme.colors.text,
            } }, `${label}${props.required ? ' *' : ''}`),
        React.createElement(View, { style: {
                height: 1,
                width: '100%',
                alignSelf: 'center',
                backgroundColor: globalColors.grey.medium,
                marginTop: 0,
                marginBottom: 20,
                borderWidth: 0,
                shadowOffset: { width: 1, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 2,
                elevation: 2,
            } }),
        React.createElement(RadioButton.Group, { onValueChange: handleValueChange, value: value ?? '' }, allowedValues?.map((item, idx) => (React.createElement(View, { key: `${item}-${idx}`, style: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
            } }, Platform.OS === 'ios' ? (React.createElement(React.Fragment, null,
            React.createElement(View, { style: {
                    borderWidth: 0.8,
                    borderRadius: 50,
                    borderColor: theme.dark
                        ? globalColors.defaultLight
                        : globalColors.defaultDark,
                } },
                React.createElement(RadioButton, { value: item, color: theme.dark
                        ? globalColors.defaultLight
                        : globalColors.defaultDark })),
            React.createElement(Text, { style: { marginLeft: 15 } }, transform ? transform(item) : item))) : (React.createElement(React.Fragment, null,
            React.createElement(RadioButton, { value: item, color: theme.dark
                    ? globalColors.defaultLight
                    : globalColors.defaultDark }),
            React.createElement(Text, { style: { marginLeft: 15 } }, transform ? transform(item) : item)))))))));
}
export default connectField(Radio, { kind: 'leaf' });
