import React from 'react';
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native';
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
            <Text style={themedStyles.flag}>{currency.flag}</Text>
            <Text style={themedStyles.listItemText}>{`${ currency.code } - ${ currency.name }`}</Text>
            <View style={[ themedStyles.radio ]}>
                {isSelected && <View style={[ themedStyles.radioSelected ]} />}
            </View>
        </TouchableOpacity>
    );
}; 