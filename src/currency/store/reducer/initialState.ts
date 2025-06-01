import { DecimalOperations } from '../../helper/DecimalOperations';
import { CurrencyState } from '../../types/currency.types';

export const initialState: CurrencyState = {
    rates: {},
    base: 'USD',
    loading: false,
    error: null,
    fromCurrency: {
        code: 'USD',
        name: 'US Dollar',
        flag: '🇺🇸',
    },
    toCurrency: {
        code: 'EUR',
        name: 'Euro',
        flag: '🇪🇺',
    },
    amount: '100',
    convertedAmount: '0',
    fetchEnabled: false,
    availableCurrencies: []
};


export const decimalOps = new DecimalOperations( 2, '1' );


