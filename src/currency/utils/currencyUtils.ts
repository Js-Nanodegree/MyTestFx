import type { Currency } from "../types/currency.types";

// Фильтрация валют по поисковому запросу
export function filterCurrencies ( currencies: Currency[], query: string ): Currency[]
{
    const lower = query.toLowerCase();
    return currencies.filter(
        ( currency ) =>
            currency.code.toLowerCase().includes( lower ) ||
            currency.name.toLowerCase().includes( lower )
    );
}

// Форматирование суммы с двумя знаками после запятой
export function formatAmount ( amount: string | number ): string
{
    return Number( amount ).toFixed( 2 );
}

// Преобразование кода валюты в флаг (если нужно)
export function getCurrencyFlag ( code: string ): string
{
    const flags: Record<string, string> = {
        USD: '🇺🇸', EUR: '🇪🇺', PLN: '🇵🇱', JPY: '🇯🇵', GBP: '🇬🇧',
        CNY: '🇨🇳', AUD: '🇦🇺', CAD: '🇨🇦', CHF: '🇨🇭', HKD: '🇭🇰',
        SGD: '🇸🇬', SEK: '🇸🇪',
    };
    return flags[ code ] || '🏳️';
} 