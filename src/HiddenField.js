import { useEffect } from 'react';
import { useField } from 'uniforms';
export default function HiddenField({ value, ...rawProps }) {
    const props = useField(rawProps.name, rawProps, { initialValue: false })[0];
    useEffect(() => {
        if (value !== undefined && value !== props.value) {
            props.onChange(value);
        }
    });
    return props.noDOM ? null : null;
}
