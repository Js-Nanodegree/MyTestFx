import { CurrencyListItem } from '@/src/currency/components/CurrencyListItem';
import { useCurrency } from '@/src/currency/store/context/CurrencyContext';
import { spacing, styles, themes } from '@/src/currency/styles/currency.styles';
import { CurrencyActionType, type Currency } from '@/src/currency/types/currency.types';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Text, TextInput, useColorScheme, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { state, dispatch } = useCurrency();
  const { availableCurrencies } = state;
  const [search, setSearch] = useState('');
  const colorScheme = useColorScheme() || 'light';
  const themedStyles = styles(colorScheme);
  const insets = useSafeAreaInsets();
  const { side } = useLocalSearchParams();
  const navigation = useNavigation();

  const filteredCurrencies = React.useMemo(() => {
    if (!availableCurrencies) return [];

    const filtered = availableCurrencies.filter(
      (currency: Currency) =>
        currency?.code?.toLowerCase().includes(search.toLowerCase()) ||
        currency?.name?.toLowerCase().includes(search.toLowerCase())
    );

    return filtered.sort((a: Currency, b: Currency) => a.name.localeCompare(b.name));
  }, [availableCurrencies, search]);

  const renderItem = React.useCallback(
    ({ item }: { item: Currency }) => {
      const handleSelect = (currency: Currency) => {
        dispatch({ type: CurrencyActionType.SET_AMOUNT, payload: '100' });
        if (side === 'from') {
          dispatch({ type: CurrencyActionType.SET_FROM_CURRENCY, payload: currency });
        } else {
          dispatch({ type: CurrencyActionType.SET_TO_CURRENCY, payload: currency });
        }
        navigation.goBack();
      };
      const currency = side === 'from' ? state?.fromCurrency : state?.toCurrency;
      return (
        <Animated.View entering={FadeIn.duration(100)}>
          <CurrencyListItem
            currency={item}
            isSelected={currency?.code === item?.code}
            onSelect={() => handleSelect(item)}
          />
        </Animated.View>
      );
    },
    [state, side, dispatch, navigation]
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
        placeholderTextColor={themes[colorScheme].border}
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
          data={filteredCurrencies}
          renderItem={renderItem}
          bounces={false}
          keyExtractor={(item: Currency) => item?.code}
          removeClippedSubviews={true}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                paddingVertical: 30,
                alignItems: 'center',
              }}
            >
              <Text style={themedStyles.listItemText}>No results found</Text>
            </View>
          }
          windowSize={10}
          updateCellsBatchingPeriod={100}
          onEndReachedThreshold={0.5}
          onEndReached={() => {}}
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
