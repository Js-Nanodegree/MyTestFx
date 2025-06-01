import { fetchExchangeRates } from '@/src/currency/api/currencyApi';
import { CurrencyPicker } from '@/src/currency/components/CurrencyPicker';
import { useCurrency, useFetchExchangeRates } from '@/src/currency/hooks';
import { spacing, styles, themes } from '@/src/currency/styles/currency.styles';
import { CurrencyActionType, type Currency } from '@/src/currency/types/currency.types';
import Decimal from 'decimal.js';
import * as Haptics from 'expo-haptics';
import { useFocusEffect, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import
{
  ActivityIndicator,
  Alert,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import
{
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export const ALL_CURRENCIES = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'PLN', name: 'Polish Zloty', flag: '🇵🇱' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'GBP', name: 'British Pound Sterling', flag: '🇬🇧' },
  { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
  { code: 'HKD', name: 'Hong Kong Dollar', flag: '🇭🇰' },
  { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬' },
  { code: 'SEK', name: 'Swedish Krona', flag: '🇸🇪' },
];
export default function HomeScreen ()
{
  const { state, dispatch } = useCurrency();
  const { fromCurrency, toCurrency, amount, convertedAmount, loading, error } = state;
  const colorScheme = useColorScheme() || 'light';
  const themedStyles = styles( colorScheme );
  const navigation = useNavigation();

  useFetchExchangeRates( {
    enabled: true,
    base: fromCurrency?.code || 'USD',
    dispatch,
  } );

  // Animation for swap button
  const rotation = useSharedValue( 0 );
  // Animation for keyboard
  const keyboardOffset = useSharedValue( 0 );
  // Animation for results
  const resultsOpacity = useSharedValue( 1 );

  useEffect( () =>
  {
    const keyboardWillShow = Keyboard.addListener( 'keyboardWillShow', () =>
    {
      keyboardOffset.value = withTiming( -100, { duration: 300 } );
    } );
    const keyboardWillHide = Keyboard.addListener( 'keyboardWillHide', () =>
    {
      keyboardOffset.value = withTiming( 0, { duration: 300 } );
    } );

    return () =>
    {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, [] );

  const handleSwap = () =>
  {
    Haptics.impactAsync( Haptics.ImpactFeedbackStyle.Medium );
    rotation.value = withSequence(
      withSpring( rotation.value + 180, { damping: 10, stiffness: 100 } ),
      withSpring( rotation.value + 360, { damping: 10, stiffness: 100 } )
    );
    dispatch( { type: CurrencyActionType.SWAP_CURRENCIES } );
  };

  const handleRefreshRates = async () =>
  {
    Haptics.notificationAsync( Haptics.NotificationFeedbackType.Success );
    dispatch( { type: CurrencyActionType.SET_LOADING, payload: true } );
    try
    {
      const { rates, availableCodes } = await fetchExchangeRates( fromCurrency.code );
      const availableCurrencies = ALL_CURRENCIES.filter( ( currency: Currency ) =>
        availableCodes.includes( currency.code )
      );
      dispatch( { type: CurrencyActionType.SET_RATES, payload: rates } );
      dispatch( { type: CurrencyActionType.SET_AVAILABLE_CURRENCIES, payload: availableCurrencies } );
    } catch ( error )
    {
      Haptics.notificationAsync( Haptics.NotificationFeedbackType.Error );
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      Alert.alert( 'Error', errorMessage, [
        { text: 'Retry', onPress: () => handleRefreshRates() },
        { text: 'Cancel', style: 'cancel' },
      ] );
      dispatch( { type: CurrencyActionType.SET_LOADING, payload: false } );
    }
  };

  useFocusEffect(
    React.useCallback( () =>
    {
      handleRefreshRates();
    }, [] )
  );

  const animatedStyle = useAnimatedStyle( () =>
  {
    return {
      transform: [ { translateY: keyboardOffset.value } ],
    };
  } );

  const swapButtonStyle = useAnimatedStyle( () =>
  {
    return {
      transform: [ { rotate: `${ rotation.value }deg` } ],
    };
  } );

  const resultsStyle = useAnimatedStyle( () =>
  {
    return {
      opacity: resultsOpacity.value,
      transform: [ { scale: withSpring( resultsOpacity.value ) } ],
    };
  } );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={[ themedStyles.container, animatedStyle ]}>
        <View
          style={{
            position: 'relative',
            paddingTop: 20,
            width: '100%',
            marginBottom: spacing.md + spacing.md,
          }}
        >
          {loading && (
            <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                top: 0,
                left: 0,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ActivityIndicator size="small" color={themes[ colorScheme ].text} />
              <Text style={[ themedStyles.loadingText, { marginLeft: spacing.sm } ]}>
                Loading rates...
              </Text>
            </View>
          )}
          <View style={[ themedStyles.row, {} ]}>
            <View style={themedStyles.currencyContainer}>
              <Text style={themedStyles.label}>From:</Text>
              <CurrencyPicker
                selectedCurrency={fromCurrency}
                onPress={() => navigation.navigate( 'explore' as never, { side: 'from' } )}
              />
            </View>
            <Animated.View style={[ themedStyles.swapButtonContainer, swapButtonStyle ]}>
              <View style={{ flex: 1 }} />
              <TouchableOpacity onPress={handleSwap}>
                <Text style={themedStyles.swapIcon}>⇆</Text>
              </TouchableOpacity>
            </Animated.View>
            <View style={themedStyles.currencyContainer}>
              <Text style={themedStyles.label}>To:</Text>
              <CurrencyPicker
                selectedCurrency={toCurrency}
                onPress={() => navigation.navigate( 'explore' as never, { side: 'to' } )}
              />
            </View>
          </View>
          <View style={{}}>
            <Text style={themedStyles.label}>Amount:</Text>
            <TextInput
              style={themedStyles.input}
              value={amount}
              onBlur={Keyboard.dismiss}
              onSubmitEditing={Keyboard.dismiss}
              onChangeText={value =>
                dispatch( { type: CurrencyActionType.SET_AMOUNT, payload: value } )
              }
              keyboardType="numeric"
              placeholder="Enter amount"
              placeholderTextColor={themes[ colorScheme ].border}
            />
          </View>
          {error && <Text style={themedStyles.errorText}>{error}</Text>}
          {new Decimal( state?.amount || '0' ).gt( 0 ) && (
            <>
              <Animated.View style={resultsStyle}>
                <Text style={themedStyles.resultDiff}>
                  {amount || '0'} {fromCurrency?.code} =
                </Text>
                <Text style={themedStyles.result}>
                  {convertedAmount} {toCurrency?.code}
                </Text>
              </Animated.View>
            </>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
