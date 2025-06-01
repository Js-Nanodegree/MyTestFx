import axios from 'axios';
import { API_CONFIG } from '../config/api.config';

const API_URL = `${ API_CONFIG.BASE_URL }/latest.json?app_id=${ API_CONFIG.API_KEY }`;

export const fetchExchangeRates = async (
    base: string
): Promise<{
    rates: Record<string, number>;
    availableCodes: string[];
}> =>
{
    try
    {
        const response = await axios.get( `${ API_URL }&base=${ base || 'USD' }` );
        const rates = response.data.rates;
        const availableCodes = Object.keys( rates );
        return { rates, availableCodes };
    } catch ( error )
    {
        console.error( 'Error fetching exchange rates:', error );
        return {
            rates: {},
            availableCodes: [],
        };
    }
}; 