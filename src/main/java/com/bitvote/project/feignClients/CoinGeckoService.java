package com.bitvote.project.feignClients;

import com.bitvote.project.coin.Coin;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CoinGeckoService {

    private final CoinGeckoClient coinGeckoClient;

    public CoinGeckoService(CoinGeckoClient coinGeckoClient) {
        this.coinGeckoClient = coinGeckoClient;
    }

    public List<Coin> getCoins(Integer size, Integer page){
        return coinGeckoClient.getCoins(size, page);
    }

    public Map<String,Object> getCoin(String id){
        return coinGeckoClient.getCoin(id);
    }
}
