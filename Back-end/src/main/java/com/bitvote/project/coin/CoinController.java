package com.bitvote.project.coin;

import com.bitvote.project.feignClients.CoinGeckoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/coins")
public class CoinController {
    private final CoinGeckoService coinGeckoService;

    public CoinController(CoinGeckoService coinGeckoService) {
        this.coinGeckoService = coinGeckoService;
    }

    @GetMapping
    public List<Object> getCoins(@RequestParam("per_page") Integer size,
                                 @RequestParam("page") Integer page) {
        return coinGeckoService.getCoins(size, page);
    }

    @GetMapping(path = "/{id}")
    public Map<String,Object> getCoin(@PathVariable("id") String id) {
        return coinGeckoService.getCoin(id);
    }

    @GetMapping(path = "/{id}/market_chart")
    public Map<String,Object> getCoinMarketChart(@PathVariable("id") String id,
                                                 @RequestParam("days") Integer days) {
        return coinGeckoService.getCoinMarketChart(id, days);
    }
}
