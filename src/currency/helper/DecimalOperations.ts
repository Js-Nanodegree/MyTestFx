import Decimal from 'decimal.js';

export class DecimalOperations
{
    private precision: number;
    private step: string;
    constructor( precision: number = 2, step: string = '1' )
    {
        this.precision = precision;
        this.step = step;
        Decimal.set( { precision: 20 } );
    }
    add ( a: string | number, b: string | number ): string
    {
        return new Decimal( a ).plus( b ).toFixed( this.precision );
    }
    subtract ( a: string | number, b: string | number ): string
    {
        return new Decimal( a ).minus( b ).toFixed( this.precision );
    }
    multiply ( a: string | number, b: string | number ): string
    {
        return new Decimal( a ).times( b ).toFixed( this.precision );
    }
    divide ( a: string | number, b: string | number ): string
    {
        if ( new Decimal( b ).isZero() ) return '0';
        return new Decimal( a ).div( b ).toFixed( this.precision );
    }
    increment ( value: string | number ): string
    {
        return this.add( value, this.step );
    }
    decrement ( value: string | number ): string
    {
        return this.subtract( value, this.step );
    }
    toFixed ( value: string | number ): string
    {
        return new Decimal( value ).toFixed( this.precision );
    }
    convertAmount ( amount: string, rateFrom: number, rateTo: number ): string
    {
        const amountDecimal = new Decimal( amount || '0' );
        if ( amountDecimal.isZero() ) return '0';
        const rateFromDecimal = new Decimal( rateFrom || 1 );
        const rateToDecimal = new Decimal( rateTo || 1 );
        const converted = amountDecimal.div( rateFromDecimal ).times( rateToDecimal );
        return converted.toFixed( this.precision );
    }
}
