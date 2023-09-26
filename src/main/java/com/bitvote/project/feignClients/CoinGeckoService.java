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

    @Cacheable(value = "coins")
    public List<Object> getCoins(Integer size, Integer page){
        return coinGeckoClient.getCoins(size, page);
    }

    @Cacheable(value = "coin")
    public Map<String,Object> getCoin(String id){
        return coinGeckoClient.getCoin(id);
    }

    @Cacheable(value = "coinMarketChart")
    public Map<String,Object> getCoinMarketChart(String id, Integer days){
        return coinGeckoClient.getCoinMarketChart(id, days);
    }
}
