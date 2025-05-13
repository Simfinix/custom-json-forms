import React from 'react';
import { View } from 'react-native';
import { FieldProps, connectField } from 'uniforms';
import { TextInput, HelperText } from 'react-native-paper';

export type TextAreaFieldProps = FieldProps<
  string,
  React.ComponentProps<typeof TextInput>,
  {
    helperText?: string;
    inputRef?: any;
  }
>;

function Text({
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
}: TextAreaFieldProps) {
  let formHelperText = (error && showInlineError && errorMessage) || helperText;

  let helperProps: any = {
    type: showInlineError && error ? 'error' : 'info',
  };

  return (
    <View
      style={{
        flex: 1,
        marginBottom: 8,
      }}
    >
      <TextInput
        mode="flat"
        disabled={disabled || readOnly}
        multiline
        error={!!error}
        label={`${label as any}${(props as any).required ? ' *' : ''}`}
        dense={true}
        onChangeText={(text: string) => disabled || onChange(text)}
        placeholder={placeholder}
        ref={inputRef}
        value={value}
        style={{ backgroundColor: 'transparent' }}
        underlineStyle={{
          width: '90%',
          height: 1.5,
          backgroundColor: '#462A82',
          bottom: 0,
          left: '5%',
        }}
        activeUnderlineColor="#462A82"
        {...(props as any)}
      />
      {!!formHelperText && (
        <HelperText {...helperProps}>{formHelperText}</HelperText>
      )}
    </View>
  );
}

export default connectField<TextAreaFieldProps>(Text, { kind: 'leaf' });
