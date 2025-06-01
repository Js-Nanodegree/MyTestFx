import { useCallback } from 'react';
import { type CurrencyAction, CurrencyActionType } from '../types/currency.types';


export const useToggleFetch = (
    fetchEnabled: boolean,
    dispatch: React.Dispatch<CurrencyAction>
) =>
{
    return useCallback( () =>
    {
        dispatch( {
            type: CurrencyActionType.TOGGLE_FETCH,
            payload: !fetchEnabled
        } );
    }, [ fetchEnabled, dispatch ] );
};
