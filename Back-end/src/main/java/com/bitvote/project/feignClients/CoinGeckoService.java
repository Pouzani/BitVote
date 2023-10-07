package com.bitvote.project.feignClients;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CoinGeckoService {

    private final CoinGeckoClient coinGeckoClient;

    public CoinGeckoService(CoinGeckoClient coinGeckoClient) {
        this.coinGeckoClient = coinGeckoClient;
    }

    /**
     * The getCoins function is a function that returns the list of coins from CoinGecko.
     *
     *
     * @param Integer size Specify the number of coins to be returned
     * @param Integer page Specify the page number of results to return
     *
     * @return A list of objects
     *
     * @docauthor Trelent
     */
    @Cacheable(value = "coins")
    public List<Object> getCoins(Integer size, Integer page){
        return coinGeckoClient.getCoins(size, page);
    }

    /**
     * The getCoin function is a function that takes in an id and returns the coin information
     *
     *
     * @param String id Get the coin information from coingecko api
     */
    @Cacheable(value = "coin")
    public Map<String,Object> getCoin(String id){
        return coinGeckoClient.getCoin(id);
    }

    /**
     * The getCoinMarketChart function is a function that takes in two parameters, id and days.
     * The id parameter is the coin's ID on CoinGecko.com, while the days parameter specifies how many days of data to return.
     * This function returns a map containing all of the information returned by CoinGecko's API call for this endpoint: https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&amp;days=${days}.

     *
     * @param String id Specify the coin id
     * @param Integer days Specify the number of days to return data for
     */
    @Cacheable(value = "coinMarketChart")
    public Map<String,Object> getCoinMarketChart(String id, Integer days){
        return coinGeckoClient.getCoinMarketChart(id, days);
    }
}
