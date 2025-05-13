import React from 'react';
import { View } from 'react-native';
import { HelperText } from 'react-native-paper';
import { useForm } from 'uniforms';
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function ErrorsField(props) {
    const { error, schema } = useForm();
    return !error && !props.children ? null : (React.createElement(View, { style: { flex: 1 } },
        !!props.children && React.createElement(HelperText, { type: "error", ...props }),
        schema.getErrorMessages(error).map((message, index) => (React.createElement(HelperText, { key: index, type: "error", ...props }, capitalizeFirstLetter(message))))));
}
export default ErrorsField;
