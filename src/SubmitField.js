import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useForm } from 'uniforms';
function SubmitField({ disabled, children, label = 'Submit', }) {
    let { error, state, onSubmit } = useForm();
    return (React.createElement(View, { style: { flex: 1, marginTop: 8 } },
        React.createElement(Button, { mode: "contained", disabled: disabled === undefined ? !!(!!error || !!state.disabled) : disabled, onPress: onSubmit }, children || label)));
}
export default SubmitField;
