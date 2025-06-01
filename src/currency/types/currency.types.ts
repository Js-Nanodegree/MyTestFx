export interface CurrencyState
{
  availableCurrencies: never[];
  rates: Record<string, number>;
  base: string;
  loading: boolean;
  fromCurrency: Currency;
  toCurrency: Currency;
  amount: string;
  convertedAmount: string;
  error: string | null;
  fetchEnabled: boolean;
}

export interface CurrencyContextType extends CurrencyState
{
  dispatch: React.Dispatch<CurrencyAction>;
  toggleFetch: () => void;
}
export type Currency = {
  code: string;
  name: string;
  flag: string;
};

export type CurrencyPickerProps = {
  selectedCurrency: Currency;
  onPress: () => void;
};

export type CurrencyListItemProps = {
  currency: Currency;
  isSelected: boolean;
  onSelect: () => void;
};

export interface CurrencyContextType extends CurrencyState
{
  state: CurrencyState;
  toggleFetch: () => void;
  dispatch: React.Dispatch<CurrencyAction>;
}

export enum CurrencyActionType
{
  SET_FROM_CURRENCY = 'SET_FROM_CURRENCY',
  SET_TO_CURRENCY = 'SET_TO_CURRENCY',
  SET_AMOUNT = 'SET_AMOUNT',
  SET_RATES = 'SET_RATES',
  SET_AVAILABLE_CURRENCIES = 'SET_AVAILABLE_CURRENCIES',
  SWAP_CURRENCIES = 'SWAP_CURRENCIES',
  SET_LOADING = 'SET_LOADING',
  TOGGLE_FETCH = 'TOGGLE_FETCH',
  SET_ERROR = "SET_ERROR",
}

export type CurrencyAction =
  | { type: CurrencyActionType.SET_ERROR; payload: string }
  | { type: CurrencyActionType.SET_FROM_CURRENCY; payload: Currency }
  | { type: CurrencyActionType.SET_TO_CURRENCY; payload: Currency }
  | { type: CurrencyActionType.SET_AMOUNT; payload: string }
  | { type: CurrencyActionType.SET_RATES; payload: Record<string, number> }
  | { type: CurrencyActionType.SET_AVAILABLE_CURRENCIES; payload: Currency[] }
  | { type: CurrencyActionType.SWAP_CURRENCIES }
  | { type: CurrencyActionType.SET_LOADING; payload: boolean }
  | { type: CurrencyActionType.TOGGLE_FETCH; payload: boolean };
