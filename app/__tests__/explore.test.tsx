import { useCurrency } from '@/src/currency/store/context/CurrencyContext';
import { fireEvent, render } from '@testing-library/react-native';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import ExploreScreen from '../explore';

jest.mock( '@/src/currency/store/context/CurrencyContext', () => ( {
    useCurrency: jest.fn(),
} ) );
jest.mock( 'expo-router', () => ( {
    useLocalSearchParams: jest.fn(),
    useNavigation: () => ( { goBack: jest.fn() } ),
} ) );
jest.mock( 'react-native-safe-area-context', () => ( {
    useSafeAreaInsets: () => ( { bottom: 0 } ),
} ) );

const mockCurrencies = [
    { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
    { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
];

describe( 'ExploreScreen', () =>
{
    beforeEach( () =>
    {
        ( useCurrency as jest.Mock ).mockReturnValue( {
            state: {
                availableCurrencies: mockCurrencies,
                fromCurrency: mockCurrencies[ 0 ],
                toCurrency: mockCurrencies[ 1 ],
            },
            dispatch: jest.fn(),
        } );
        ( useLocalSearchParams as jest.Mock ).mockReturnValue( { side: 'from' } );
    } );

    it( 'рендерит поле поиска', () =>
    {
        const { getByPlaceholderText } = render( <ExploreScreen /> );
        expect( getByPlaceholderText( 'Search (e.g., USD)' ) ).toBeTruthy();
    } );

    it( 'отображает список валют', () =>
    {
        const { getByText } = render( <ExploreScreen /> );
        expect( getByText( 'USD - US Dollar' ) ).toBeTruthy();
        expect( getByText( 'EUR - Euro' ) ).toBeTruthy();
        expect( getByText( 'JPY - Japanese Yen' ) ).toBeTruthy();
    } );

    it( 'фильтрует список валют по поиску', () =>
    {
        const { getByPlaceholderText, queryByText } = render( <ExploreScreen /> );
        const input = getByPlaceholderText( 'Search (e.g., USD)' );
        fireEvent.changeText( input, 'eur' );
        expect( queryByText( 'EUR - Euro' ) ).toBeTruthy();
        expect( queryByText( 'USD - US Dollar' ) ).toBeNull();
        expect( queryByText( 'JPY - Japanese Yen' ) ).toBeNull();
    } );
} ); 