import React from 'react';
import { View } from 'react-native';
import { connectField } from 'uniforms';
import { Text, useTheme } from 'react-native-paper';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
function Radio({ error, label, value, readOnly, disabled, transform, allowedValues, onChange, ...props }) {
    const theme = useTheme();
    return (React.createElement(View, { style: {
            flex: 1,
            marginBottom: 8,
        } },
        React.createElement(Text, { style: {
                marginBottom: 8,
                color: !!error ? theme.colors.error : theme.colors.text,
            } }, `${label}${props.required ? ' *' : ''}`),
        allowedValues?.map((item, idx) => (React.createElement(View, { key: `${item}-${idx}`, style: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 10,
            } },
            React.createElement(BouncyCheckbox, { size: 99999, fillColor: "#9342f5", unFillColor: "#FFFFFF", iconStyle: { borderColor: '#9342f5', borderRadius: 50 }, innerIconStyle: { borderWidth: 2 }, isChecked: value === item, onPress: () => !(disabled || readOnly) && onChange(item), text: transform ? transform(item) : item }))))));
}
export default connectField(Radio, {
    kind: 'leaf',
});
