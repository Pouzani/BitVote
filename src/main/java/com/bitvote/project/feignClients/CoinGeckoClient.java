package com.bitvote.project.feignClients;

import com.bitvote.project.coin.Coin;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;

@FeignClient(
        value = "coinGecko",
        url = "https://api.coingecko.com/api/v3"
)
public interface CoinGeckoClient {
    @GetMapping(path = "/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=false")
    List<Coin> getCoins(@RequestParam("per_page") Integer size,
                        @RequestParam("page") Integer page);

    @GetMapping(path = "/coins/{id}")
    Map<String,Object> getCoin(@PathVariable("id") String id);
}
