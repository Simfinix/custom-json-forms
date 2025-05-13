import { createElement } from 'react';
import { View } from 'react-native';
import { useForm } from 'uniforms';
import AutoField from './AutoField';
export default function AutoFields({ autoField = AutoField, element = View, fields, omitFields = [], showInlineError, ...props }) {
    const { schema } = useForm();
    return createElement(element, props, (fields ?? schema.getSubfields())
        .filter((field) => !omitFields.includes(field))
        .map((field) => createElement(autoField, Object.assign({ key: field, name: field }, showInlineError === undefined ? null : { showInlineError }))));
}
