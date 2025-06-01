import React from 'react';
import { Image, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { styles } from '../styles/currency.styles';
import type { CurrencyListItemProps } from '../types/currency.types';

export const CurrencyListItem: React.FC<CurrencyListItemProps> = ( {
    currency,
    isSelected,
    onSelect,
} ) =>
{
    const colorScheme = useColorScheme() || 'light';
    const themedStyles = styles( colorScheme );

    return (
        <TouchableOpacity
            style={[
                themedStyles.listItemContainer,
                {
                    backgroundColor: isSelected ? 'rgba(222, 222, 222, 1)' : 'transparent',
                },
            ]}
            onPress={onSelect}
        >
            <View style={{ width: 20, height: 14, borderRadius: 4, overflow: 'hidden', marginRight: 5 }}>
                <Image source={{ uri: currency?.flagSrc }} style={{ flex: 1 }} />
            </View>
            <Text style={themedStyles.flag}>{currency.flag}</Text>
            <Text
                style={themedStyles.listItemText}
            >{`${ currency.code } - ${ currency.name }`}</Text>
            <View style={[ themedStyles.radio ]}>
                {isSelected && <View style={[ themedStyles.radioSelected ]} />}
            </View>
        </TouchableOpacity>
    );
};
