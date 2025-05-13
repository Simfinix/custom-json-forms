import React, { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { FieldProps, connectField } from 'uniforms';
import { RadioButton, Text, useTheme } from 'react-native-paper';
import globalColors from './globalColors';

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

  const handleValueChange = (newValue: any) => {
    if (!disabled && !readOnly) {
      onChange(newValue);
    }
  };

  const isSum = props?.field?.sum;

  return isSum ? (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          marginTop: 8,
          fontSize: 20,
          color: !!error ? theme.colors.error : theme.colors.text,
        }}
      >
        {`${label as any}${(props as any).required ? ' *' : ''}`}
      </Text>
      <View
        style={{
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
        }}
      />
      <RadioButton.Group onValueChange={handleValueChange} value={value ?? ''}>
        {allowedValues?.map((item: any, idx: number) => (
          <View
            key={`${item}-${idx}`}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            {Platform.OS === 'ios' ? (
              <>
                <View
                  style={{
                    borderWidth: 0.8,
                    borderRadius: 50,
                    borderColor: theme.dark
                      ? globalColors.defaultLight
                      : globalColors.defaultDark,
                  }}
                >
                  <RadioButton
                    value={item}
                    color={
                      theme.dark
                        ? globalColors.defaultLight
                        : globalColors.defaultDark
                    }
                  />
                </View>
                <View style={{ paddingRight: '5%' }}>
                  <Text style={{ marginLeft: 15, marginRight: 15 }}>
                    {transform ? transform(item.label) : item.label}
                  </Text>
                </View>
              </>
            ) : (
              <>
                <RadioButton
                  value={item}
                  color={
                    theme.dark
                      ? globalColors.defaultLight
                      : globalColors.defaultDark
                  }
                />
                <View style={{ paddingRight: '5%' }}>
                  <Text style={{ marginLeft: 15, marginRight: 15 }}>
                    {transform ? transform(item.label) : item.label}
                  </Text>
                </View>
              </>
            )}
          </View>
        ))}
      </RadioButton.Group>
    </View>
  ) : (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          marginTop: 8,
          marginBottom: 8,
          fontSize: 20,
          color: !!error ? theme.colors.error : theme.colors.text,
        }}
      >
        {`${label as any}${(props as any).required ? ' *' : ''}`}
      </Text>
      <View
        style={{
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
        }}
      />
      <RadioButton.Group onValueChange={handleValueChange} value={value ?? ''}>
        {allowedValues?.map((item: any, idx: number) => (
          <View
            key={`${item}-${idx}`}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            {Platform.OS === 'ios' ? (
              <>
                <View
                  style={{
                    borderWidth: 0.8,
                    borderRadius: 50,
                    borderColor: theme.dark
                      ? globalColors.defaultLight
                      : globalColors.defaultDark,
                  }}
                >
                  <RadioButton
                    value={item}
                    color={
                      theme.dark
                        ? globalColors.defaultLight
                        : globalColors.defaultDark
                    }
                  />
                </View>
                <Text style={{ marginLeft: 15 }}>
                  {transform ? transform(item) : item}
                </Text>
              </>
            ) : (
              <>
                <RadioButton
                  value={item}
                  color={
                    theme.dark
                      ? globalColors.defaultLight
                      : globalColors.defaultDark
                  }
                />
                <Text style={{ marginLeft: 15 }}>
                  {transform ? transform(item) : item}
                </Text>
              </>
            )}
          </View>
        ))}
      </RadioButton.Group>
    </View>
  );
}

export default connectField<RadioFieldProps>(Radio, { kind: 'leaf' });
