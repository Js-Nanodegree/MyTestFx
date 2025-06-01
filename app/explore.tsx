import { CurrencyListItem } from '@/src/currency/components/CurrencyListItem';
import { useCurrency } from '@/src/currency/store/context/CurrencyContext';
import { spacing, styles, themes } from '@/src/currency/styles/currency.styles';
import { CurrencyActionType, type Currency } from '@/src/currency/types/currency.types';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { Animated, FlatList, TextInput, useColorScheme, View } from 'react-native';
import { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen ()
{
  const { state, dispatch } = useCurrency();
  const { availableCurrencies } = state;
  const [ search, setSearch ] = useState( '' );
  const colorScheme = useColorScheme() || 'light';
  const themedStyles = styles( colorScheme );
  const insets = useSafeAreaInsets();
  const { side } = useLocalSearchParams();
  const navigation = useNavigation();

  const filteredCurrencies = availableCurrencies.filter(
    ( currency: { code: string; name: string } ) =>
      currency?.code.toLowerCase().includes( search.toLowerCase() ) ||
      currency?.name.toLowerCase().includes( search.toLowerCase() )
  );

  const renderItem = React.useCallback(
    ( { item }: { item: Currency } ) =>
    {
      const handleSelect = ( currency: Currency ) =>
      {
        dispatch( { type: CurrencyActionType.SET_AMOUNT, payload: '100' } );
        if ( side === 'from' )
        {
          dispatch( { type: CurrencyActionType.SET_FROM_CURRENCY, payload: currency } );
        } else
        {
          dispatch( { type: CurrencyActionType.SET_TO_CURRENCY, payload: currency } );
        }
        navigation.goBack();
      };
      const currency = side === 'from' ? state.fromCurrency : state.toCurrency;
      return (
        <Animated.View entering={FadeIn.duration( 100 )}>
          <CurrencyListItem
            currency={item}
            isSelected={currency.code === item?.code}
            onSelect={() => handleSelect( item )}
          />
        </Animated.View>
      );
    },
    [ state, side ]
  );

  return (
    <View
      style={[
        themedStyles.container,
        {
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <TextInput
        style={themedStyles.input}
        placeholder="Search (e.g., USD)"
        placeholderTextColor={themes[ colorScheme ].border}
        value={search}
        onChangeText={setSearch}
      />
      <View
        style={{
          borderRadius: spacing.sm,
          overflow: 'hidden',
          flex: 1,
        }}
      >
        <FlatList
          data={filteredCurrencies.sort( ( a: Currency, b: Currency ) => a.name.localeCompare( b.name ) )}
          renderItem={renderItem}
          bounces={false}
          keyExtractor={( item: { code: string } ) => item?.code}
          // estimatedItemSize={52}
          removeClippedSubviews={true}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
          updateCellsBatchingPeriod={100}
          onEndReachedThreshold={0.5}
          onEndReached={() => { }}
          contentContainerStyle={{
            backgroundColor: 'rgba(231, 231, 231, 1)',
            borderRadius: spacing.sm,
            overflow: 'hidden',
          }}
        />
      </View>
    </View>
  );
}
