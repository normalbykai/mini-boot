package com.normal.mini.framework.idempotent.config;

import com.normal.mini.framework.idempotent.core.aop.IdempotentAspect;
import com.normal.mini.framework.idempotent.core.keyresolver.impl.DefaultIdempotentKeyResolver;
import com.normal.mini.framework.idempotent.core.keyresolver.impl.ExpressionIdempotentKeyResolver;
import com.normal.mini.framework.idempotent.core.keyresolver.IdempotentKeyResolver;
import com.normal.mini.framework.idempotent.core.keyresolver.impl.UserIdempotentKeyResolver;
import com.normal.mini.framework.idempotent.core.redis.IdempotentRedisDAO;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import com.normal.mini.framework.redis.config.MiniRedisAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.core.StringRedisTemplate;

import java.util.List;

@AutoConfiguration(after = MiniRedisAutoConfiguration.class)
public class MiniIdempotentConfiguration {

    @Bean
    public IdempotentAspect idempotentAspect(List<IdempotentKeyResolver> keyResolvers, IdempotentRedisDAO idempotentRedisDAO) {
        return new IdempotentAspect(keyResolvers, idempotentRedisDAO);
    }

    @Bean
    public IdempotentRedisDAO idempotentRedisDAO(StringRedisTemplate stringRedisTemplate) {
        return new IdempotentRedisDAO(stringRedisTemplate);
    }

    // ========== 各种 IdempotentKeyResolver Bean ==========

    @Bean
    public DefaultIdempotentKeyResolver defaultIdempotentKeyResolver() {
        return new DefaultIdempotentKeyResolver();
    }

    @Bean
    public UserIdempotentKeyResolver userIdempotentKeyResolver() {
        return new UserIdempotentKeyResolver();
    }

    @Bean
    public ExpressionIdempotentKeyResolver expressionIdempotentKeyResolver() {
        return new ExpressionIdempotentKeyResolver();
    }

}
