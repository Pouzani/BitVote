export interface Coin {
    id: number;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    high_24h: number;
    low_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_percentage_24h: number;
    market_cap_change_24h: number;
    total_volume: number;
}