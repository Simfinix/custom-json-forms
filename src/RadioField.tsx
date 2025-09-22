import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { View } from 'react-native';
import { FieldProps, connectField } from 'uniforms';
import { Text, useTheme } from 'react-native-paper';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import globalColors from './globalColors';

export type RadioFieldProps = FieldProps<any, any> & {
  /** campo identificador estable por opción (default 'value') */
  valueKey?: string;
  /** duración del highlight táctil en ms (default 120) */
  touchHighlightMs?: number;
};

function Radio({
  error,
  label,
  value,
  readOnly,
  disabled,
  transform,
  allowedValues,
  onChange,
  valueKey = 'value',
  touchHighlightMs = 120,
  ...props
}: RadioFieldProps) {
  const theme = useTheme();
  const activeColor = theme.dark ? globalColors.defaultLight : globalColors.defaultDark;

  // --- Estado para highlight efímero ---
  const [flashId, setFlashId] = useState<string | undefined>(undefined);
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
  }, []);

  type OptPair = { id: string; emit: any; labelText: string; keyValue: string };

  const { radioButtons, idToEmit, selectedId } = useMemo(() => {
    const pairs: OptPair[] = (allowedValues ?? []).map((item: any, idx: number) => {
      const isObj = item && typeof item === 'object';
      const labelText =
        isObj && 'label' in item
          ? (transform ? transform(item.label) : item.label)
          : (transform ? transform(item) : String(item));

      const keyValue = isObj && valueKey in item ? String(item[valueKey]) : String(item);
      const id = `${keyValue}__${idx}`;
      return { id, emit: item, labelText, keyValue };
    });

    const idToEmitMap = new Map<string, any>();

    const baseContainer = {
      alignSelf: 'stretch' as const,
      width: '100%',
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'flex-start' as const,
      paddingVertical: 6,
      borderRadius: 8,
    };

    const buttons: RadioButtonProps[] = pairs.map(({ id, labelText }) => {
      idToEmitMap.set(id, pairs.find(p => p.id === id)!.emit);
      return {
        id,
        label: labelText,
        value: id,
        disabled: !!(disabled || readOnly),
        containerStyle: baseContainer,
        labelStyle: {
          textAlign: 'left',
          marginLeft: 12,
          flexShrink: 1,
        },
        size: 22,
        color: activeColor,
        borderColor: activeColor,
      };
    });

    // Resolver selectedId en O(n) por key
    const currentKey =
      value && typeof value === 'object' && valueKey in value
        ? String(value[valueKey])
        : String(value);

    const found = pairs.find(p => p.keyValue === currentKey);
    const selId = found?.id;

    return { radioButtons: buttons, idToEmit: idToEmitMap, selectedId: selId };
  }, [allowedValues, value, disabled, readOnly, transform, activeColor, valueKey]);

  const [internalSelectedId, setInternalSelectedId] = useState<string | undefined>(selectedId);
  useEffect(() => setInternalSelectedId(selectedId), [selectedId]);

  const handlePress = useCallback((newId?: string) => {
    if (!newId || disabled || readOnly) return;

    // 1) feedback inmediato: encender highlight
    setFlashId(newId);
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    flashTimerRef.current = setTimeout(() => setFlashId(undefined), touchHighlightMs);

    // 2) pintar selección ya mismo
    setInternalSelectedId(newId);

    // 3) notificar al form en el próximo frame (mantiene sensación instantánea)
    const emit = idToEmit.get(newId);
    requestAnimationFrame(() => {
      onChange(emit);
    });
  }, [disabled, readOnly, idToEmit, onChange, touchHighlightMs]);

  const titleColor = !!error ? theme.colors.error : theme.colors.text;

  // Estilos del grupo + alineación izquierda
  const groupContainerStyle = {
    alignItems: 'flex-start' as const,
    justifyContent: 'flex-start' as const,
    alignSelf: 'stretch' as const,
    width: '100%',
    rowGap: 6,
  };

  // Inyectamos highlight al botón que coincide con flashId (sin recrear toda la lista)
  const highlightedButtons: RadioButtonProps[] = useMemo(() => {
    if (!flashId) return radioButtons;
    return radioButtons.map(btn => {
      if (btn.id !== flashId) return btn;
      return {
        ...btn,
        containerStyle: {
          ...(btn.containerStyle as object),
          // Fondo tenue + sombra muy liviana (no bloquea el render)
          backgroundColor: theme.dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
          shadowColor: '#000',
          shadowOpacity: 0.15,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 2 },
          elevation: 2, // Android
        },
      };
    });
  }, [radioButtons, flashId, theme.dark]);

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ marginTop: 8, marginBottom: 8, fontSize: 20, color: titleColor }}>
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

      <RadioGroup
        radioButtons={highlightedButtons}
        selectedId={internalSelectedId}
        onPress={handlePress}
        layout="column"
        containerStyle={groupContainerStyle}
      />
    </View>
  );
}

export default connectField<RadioFieldProps>(Radio, { kind: 'leaf' });
