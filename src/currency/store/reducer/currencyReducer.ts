import Decimal from 'decimal.js';
import { type CurrencyAction, CurrencyActionType, type CurrencyState } from '../../types/currency.types';
import { decimalOps } from './initialState';



export const currencyReducer = ( state: CurrencyState, action: CurrencyAction ): CurrencyState =>
{
    switch ( action.type )
    {
        case CurrencyActionType.SET_FROM_CURRENCY: {
            const newState = { ...state, fromCurrency: action.payload, error: null };
            const converted = decimalOps.convertAmount(
                newState.amount,
                newState.rates[ newState.fromCurrency.code ],
                newState.rates[ newState.toCurrency.code ]
            );
            return { ...newState, convertedAmount: converted };
        }
        case CurrencyActionType.SET_TO_CURRENCY: {
            const newState = { ...state, toCurrency: action.payload, error: null };
            const converted = decimalOps.convertAmount(
                newState.amount,
                newState.rates[ newState.fromCurrency.code ],
                newState.rates[ newState.toCurrency.code ]
            );
            return { ...newState, convertedAmount: converted };
        }
        case CurrencyActionType.SET_AMOUNT: {
            const value = action.payload || '0';
            if ( !value || value.match( /^-?\d*\.?\d*$/ ) )
            {
                const numericValue = new Decimal( value ).toNumber();
                if ( numericValue < 0 )
                {
                    return { ...state, error: 'Amount cannot be negative' };
                }
                const converted = decimalOps.convertAmount(
                    value,
                    state.rates[ state.fromCurrency.code ],
                    state.rates[ state.toCurrency.code ]
                );
                return { ...state, amount: [ new Decimal( value ).toNumber() ].join( '' ), convertedAmount: converted, error: null };
            }
            return { ...state, error: 'Invalid amount' };
        }
        case CurrencyActionType.SET_RATES: {
            const converted = decimalOps.convertAmount(
                state.amount,
                action.payload[ state.fromCurrency.code ],
                action.payload[ state.toCurrency.code ]
            );
            return {
                ...state,
                rates: action.payload,
                convertedAmount: converted,
                loading: false,
                error: null,
            };
        }
        case CurrencyActionType.SET_AVAILABLE_CURRENCIES: {
            const newFromCurrency = action.payload.find( c => c.code === state.fromCurrency.code ) || action.payload[ 0 ];
            const newToCurrency = action.payload.find( c => c.code === state.toCurrency.code ) ||
                action.payload[ 1 ] ||
                action.payload[ 0 ];
            const newState = {
                ...state,
                availableCurrencies: action.payload,
                fromCurrency: newFromCurrency,
                toCurrency: newToCurrency,
            };
            const converted = decimalOps.convertAmount(
                newState.amount,
                newState.rates[ newState.fromCurrency.code ],
                newState.rates[ newState.toCurrency.code ]
            );
            return { ...newState, convertedAmount: converted };
        }
        case CurrencyActionType.SWAP_CURRENCIES: {
            const newState = {
                ...state,
                fromCurrency: state.toCurrency,
                toCurrency: state.fromCurrency,
                error: null,
            };
            const converted = decimalOps.convertAmount(
                newState.amount,
                newState.rates[ newState.fromCurrency.code ],
                newState.rates[ newState.toCurrency.code ]
            );
            return { ...newState, convertedAmount: converted };
        }
        case CurrencyActionType.SET_LOADING: {
            return { ...state, loading: action.payload };
        }
        case CurrencyActionType.TOGGLE_FETCH: {
            return { ...state, fetchEnabled: action.payload };
        }
        default:
            return state;
    }
};
