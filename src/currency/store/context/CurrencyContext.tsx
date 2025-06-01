import React, { createContext, useContext, useReducer } from 'react';
import { useFetchExchangeRates, useToggleFetch } from '../../hooks';
import { CurrencyContextType } from '../../types/currency.types';
import { currencyReducer } from '../reducer/currencyReducer';
import { initialState } from '../reducer/initialState';

const CurrencyContext = createContext<CurrencyContextType>( {
  ...initialState,
  state: initialState,
  dispatch: () => { },
  toggleFetch: () => { },
} );

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ( { children } ) =>
{
  const [ state, dispatch ] = useReducer( currencyReducer, initialState );
  const { fetchEnabled, base } = state;

  useFetchExchangeRates( fetchEnabled, base, dispatch );
  const toggleFetch = useToggleFetch( fetchEnabled, dispatch );

  return (
    <CurrencyContext.Provider value={{ ...state, state, dispatch, toggleFetch }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () =>
{
  const context = useContext( CurrencyContext );
  return context;
};
