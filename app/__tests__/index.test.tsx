import { useCurrency } from '@/src/currency/hooks';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { ALL_CURRENCIES } from '../ALL_CURRENCIES';
import HomeScreen from '../index';

// Мокаем хуки и зависимости
jest.mock( '@/src/currency/hooks', () => ( {
    useCurrency: jest.fn(),
    useFetchExchangeRates: jest.fn(),
} ) );

jest.mock( 'expo-haptics', () => ( {
    impactAsync: jest.fn(),
    notificationAsync: jest.fn(),
} ) );

jest.mock( 'expo-router', () => ( {
    useNavigation: () => ( {
        navigate: jest.fn(),
    } ),
    useFocusEffect: jest.fn(),
} ) );

describe( 'HomeScreen', () =>
{
    const mockDispatch = jest.fn();

    beforeEach( () =>
    {
        // Настраиваем начальное состояние
        ( useCurrency as jest.Mock ).mockReturnValue( {
            state: {
                fromCurrency: ALL_CURRENCIES[ 0 ],
                toCurrency: ALL_CURRENCIES[ 1 ],
                amount: '',
                convertedAmount: '',
                loading: false,
                error: null,
            },
            dispatch: mockDispatch,
        } );
    } );

    it( 'рендерит основные элементы интерфейса', () =>
    {
        const { getByText, getByPlaceholderText } = render( <HomeScreen /> );

        expect( getByText( 'From:' ) ).toBeTruthy();
        expect( getByText( 'To:' ) ).toBeTruthy();
        expect( getByText( 'Amount:' ) ).toBeTruthy();
        expect( getByPlaceholderText( 'Enter amount' ) ).toBeTruthy();
    } );

    it( 'отображает выбранные валюты', () =>
    {
        const { getByText } = render( <HomeScreen /> );

        expect( getByText( ALL_CURRENCIES[ 0 ].code ) ).toBeTruthy();
        expect( getByText( ALL_CURRENCIES[ 1 ].code ) ).toBeTruthy();
    } );

    it( 'обновляет сумму при вводе', () =>
    {
        const { getByPlaceholderText } = render( <HomeScreen /> );
        const input = getByPlaceholderText( 'Enter amount' );

        fireEvent.changeText( input, '100' );

        expect( mockDispatch ).toHaveBeenCalledWith( {
            type: 'SET_AMOUNT',
            payload: '100',
        } );
    } );

    it( 'показывает индикатор загрузки', () =>
    {
        ( useCurrency as jest.Mock ).mockReturnValue( {
            state: {
                fromCurrency: ALL_CURRENCIES[ 0 ],
                toCurrency: ALL_CURRENCIES[ 1 ],
                amount: '',
                convertedAmount: '',
                loading: true,
                error: null,
            },
            dispatch: mockDispatch,
        } );

        const { getByText } = render( <HomeScreen /> );
        expect( getByText( 'Loading rates...' ) ).toBeTruthy();
    } );

    it( 'показывает ошибку', () =>
    {
        const errorMessage = 'Test error';
        ( useCurrency as jest.Mock ).mockReturnValue( {
            state: {
                fromCurrency: ALL_CURRENCIES[ 0 ],
                toCurrency: ALL_CURRENCIES[ 1 ],
                amount: '',
                convertedAmount: '',
                loading: false,
                error: errorMessage,
            },
            dispatch: mockDispatch,
        } );

        const { getByText } = render( <HomeScreen /> );
        expect( getByText( errorMessage ) ).toBeTruthy();
    } );
} ); 