import { useEffect } from 'react';
import { fetchExchangeRates } from '../api/currencyApi';
import { CurrencyAction, CurrencyActionType } from '../types/currency.types';

export const useFetchExchangeRates = (
    enabled: boolean,
    base: string,
    dispatch: React.Dispatch<CurrencyAction>
) =>
{
    useEffect( () =>
    {
        if ( !enabled ) return;

        const fetchRates = async () =>
        {
            dispatch( { type: CurrencyActionType.SET_LOADING, payload: true } );
            try
            {
                const timeoutPromise = new Promise( ( _, reject ) =>
                {
                    setTimeout( () => reject( new Error( 'Request timed out' ) ), 10000 );
                } );

                const result = await Promise.race( [
                    fetchExchangeRates( base ),
                    timeoutPromise
                ] ) as {
                    rates: Record<string, number>;
                    availableCodes: string[];
                };

                dispatch( { type: CurrencyActionType.SET_RATES, payload: result.rates } );
            } catch ( error )
            {
                dispatch( {
                    type: CurrencyActionType.SET_ERROR,
                    payload: error instanceof Error ? error.message : 'Unknown error'
                } );
            }
        };

        fetchRates();
    }, [ enabled, base, dispatch ] );
};

