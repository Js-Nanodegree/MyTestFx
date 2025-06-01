import React from 'react';
import { Image, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { styles } from '../styles/currency.styles';
import type { CurrencyPickerProps } from '../types/currency.types';

export const CurrencyPicker: React.FC<CurrencyPickerProps> = ( { selectedCurrency, onPress } ) =>
{
    const colorScheme = useColorScheme() || 'light';
    const themedStyles = styles( colorScheme );

    return (
        <TouchableOpacity style={themedStyles.picker} onPress={onPress}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <View style={{ width: 20, height: 14, borderRadius: 4, overflow: 'hidden' }}>
                    <Image source={{ uri: selectedCurrency?.flagSrc }} style={{ flex: 1 }} />
                </View>
                <Text style={themedStyles.flag}>{selectedCurrency?.flag}</Text>
                <Text style={themedStyles.code}>{selectedCurrency?.code}</Text>
            </View>
            <Text style={themedStyles.arrow}>▼</Text>
        </TouchableOpacity>
    );
}; 