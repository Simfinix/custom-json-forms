import React from 'react';
import { Platform, View } from 'react-native';
import { FieldProps, connectField } from 'uniforms';
import { RadioButton, Text, useTheme } from 'react-native-paper';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export type RadioFieldProps = FieldProps<any, any>;

function Radio({
  error,
  label,
  value,
  readOnly,
  disabled,
  transform,
  allowedValues,
  onChange,
  ...props
}: RadioFieldProps) {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        marginBottom: 8,
      }}
    >
      <Text
        style={{
          marginBottom: 8,
          color: !!error ? theme.colors.error : theme.colors.text,
        }}
      >
        {`${label as any}${(props as any).required ? ' *' : ''}`}
      </Text>

      {allowedValues?.map((item: any, idx: number) => (
        <View
          key={`${item}-${idx}`}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <BouncyCheckbox
            size={99999}
            fillColor="#9342f5"
            unFillColor="#FFFFFF"
            iconStyle={{ borderColor: '#9342f5', borderRadius: 50 }}
            innerIconStyle={{ borderWidth: 2 }}
            isChecked={value === item}
            onPress={() => !(disabled || readOnly) && onChange(item)}
            text={transform ? transform(item) : item}
          />
        </View>
      ))}
    </View>
  );
}

export default connectField<RadioFieldProps>(Radio, {
  kind: 'leaf',
});
