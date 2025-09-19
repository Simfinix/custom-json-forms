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

  // Azul translúcido para el ripple (Android)
  const rippleColor =
    theme.dark ? 'rgba(255,255,255,0.18)' : 'rgba(33,150,243,0.25)'; // azul Material

  const handleValueChange = (newValue: any) => {
    if (!disabled && !readOnly) {
      onChange(newValue);
    }
  };

  const isSum = (props as any)?.field?.sum;

  const activeColor = theme.dark ? globalColors.defaultLight : globalColors.defaultDark;

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
                    // ⬇️ MÁS ÁREA TÁCTIL SIN TOCAR LA FILA/TEXTO
                    style={{ padding: 8 }}
                    // ⬇️ COLOR DEL CHECK
                    color={activeColor}
                    // ⬇️ RIPPLE AZUL (en Android; en iOS no aplica)
                    theme={{ colors: { ripple: rippleColor } }}
                    disabled={disabled || readOnly}
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
                  style={{ padding: 8 }} // ⬅️ agranda hit area del círculo
                  color={activeColor}
                  theme={{ colors: { ripple: rippleColor } }} // ⬅️ sombra azul inmediata
                  disabled={disabled || readOnly}
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
                    style={{ padding: 8 }} // ⬅️ +hit area
                    color={activeColor}
                    theme={{ colors: { ripple: rippleColor } }} // ⬅️ azul
                    disabled={disabled || readOnly}
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
                  style={{ padding: 8 }} // ⬅️ +hit area
                  color={activeColor}
                  theme={{ colors: { ripple: rippleColor } }} // ⬅️ azul
                  disabled={disabled || readOnly}
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

