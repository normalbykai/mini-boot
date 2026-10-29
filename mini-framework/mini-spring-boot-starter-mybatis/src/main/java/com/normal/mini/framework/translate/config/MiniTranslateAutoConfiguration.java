package com.normal.mini.framework.translate.config;

import com.normal.mini.framework.translate.core.TranslateUtils;
import org.dromara.trans.service.impl.TransService;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.context.annotation.Bean;

@AutoConfiguration
public class MiniTranslateAutoConfiguration {

    @Bean
    @SuppressWarnings("InstantiationOfUtilityClass")
    public TranslateUtils translateUtils(TransService transService) {
        TranslateUtils.init(transService);
        return new TranslateUtils();
    }

}
