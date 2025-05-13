import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { FieldProps, connectField, useForm } from 'uniforms';
import { TextInput, HelperText } from 'react-native-paper';

export type NumFieldProps = FieldProps<
  number,
  React.ComponentProps<typeof TextInput>,
  {
    helperText?: string;
    inputRef?: any;
  }
>;

function Num({
  disabled,
  error,
  errorMessage,
  helperText,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  readOnly,
  showInlineError,
  value = '',
  ...props
}: NumFieldProps) {
  const [totalSum, setTotalSum] = useState(0);
  const context = useForm();

  const formHelperText = (error && showInlineError && errorMessage) || helperText;

  const helperProps: any = {
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
    onChange(parseFloat(totalSum.toString()) as any);
  }, [totalSum]);

  return props.field.function ? (
    <View
      style={{
        flex: 1,
        marginBottom: 8,
      }}
    >
      <TextInput
        mode="outlined"
        keyboardType="numeric"
        editable={false}
        error={!!error}
        label={`${label as any}${(props as any).required ? ' *' : ''}`}
        dense={true}
        placeholder={placeholder}
        ref={inputRef}
        value={!!totalSum ? `${totalSum}` : '0'}
        onChangeText={() =>
          disabled || onChange(parseFloat(totalSum.toString()) as any)
        }
        style={{ backgroundColor: 'transparent' }}
        outlineColor="#462A82"
        activeOutlineColor="#462A82"
        {...(props as any)}
      />
      {!!formHelperText && (
        <HelperText {...helperProps}>{formHelperText}</HelperText>
      )}
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        marginBottom: 8,
      }}
    >
      <TextInput
        mode="outlined"
        keyboardType="numeric"
        disabled={disabled || readOnly}
        error={!!error}
        label={`${label as any}${(props as any).required ? ' *' : ''}`}
        dense={true}
        onChangeText={(text: string) =>
          disabled || onChange(parseFloat(text) as any)
        }
        placeholder={placeholder}
        ref={inputRef}
        value={!!value ? `${value}` : undefined}
        style={{ backgroundColor: 'transparent' }}
        outlineColor="#462A82"
        activeOutlineColor="#462A82"
        {...(props as any)}
      />
      {!!formHelperText && (
        <HelperText {...helperProps}>{formHelperText}</HelperText>
      )}
    </View>
  );
}

export default connectField<NumFieldProps>(Num, { kind: 'leaf' });
