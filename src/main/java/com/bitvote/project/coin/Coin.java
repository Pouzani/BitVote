package com.bitvote.project.coin;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Coin {
    private String id;
    private String symbol;
    private String name;
    private String image;
    private String current_price;
    private String market_cap;
    private String market_cap_rank;
    private String high_24h;
    private String low_24h;
    private String price_change_percentage_24h;
    private String market_cap_change_percentage_24h;
    private String market_cap_change_24h;
}
