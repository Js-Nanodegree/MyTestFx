import { useEffect, useState } from 'react';
import { EventRegister } from 'react-native-event-listeners';

// Хук для подписки на события обновления курсов валют
export const useExchangeRatesListener = (
    callback?: ( data: { success: boolean; rates?: Record<string, number>; error?: string } ) => void
) =>
{
    const [ ratesData, setRatesData ] = useState<{
        success: boolean;
        rates?: Record<string, number>;
        error?: string;
    } | null>( null );

    useEffect( () =>
    {
        const listener = EventRegister.addEventListener( 'exchangeRatesUpdate', data =>
        {
            setRatesData( data );
            if ( callback )
            {
                callback( data );
            }
        } );
        return () =>
        {
            if ( typeof listener === 'string' )
            {
                EventRegister.removeEventListener( listener );
            }
        };
    }, [ callback ] );

    return ratesData;
}; 