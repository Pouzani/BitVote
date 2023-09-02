package com.bitvote.project.feignClients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@FeignClient(
        value = "coinGecko",
        url = "https://api.coingecko.com/api/v3"
)
public interface CoinGeckoClient {
    @GetMapping(path = "/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=false")
    Map<String,Object> getCoins(@RequestParam("per_page") Integer size,
                                @RequestParam("page") Integer page);
}
