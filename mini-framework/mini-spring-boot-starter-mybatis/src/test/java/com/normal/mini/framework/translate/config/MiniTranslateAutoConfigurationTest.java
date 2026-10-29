package com.normal.mini.framework.translate.config;

import com.normal.mini.framework.translate.core.TranslateUtils;
import org.dromara.core.trans.vo.VO;
import org.dromara.trans.service.impl.TransService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.AutoConfigurations;
import org.springframework.boot.test.context.runner.ApplicationContextRunner;
import org.springframework.context.annotation.Bean;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class MiniTranslateAutoConfigurationTest {

    @Test
    void initializesTranslationWhenTheProviderConfigurationIsRegisteredLater() {
        new ApplicationContextRunner()
                .withConfiguration(AutoConfigurations.of(MiniTranslateAutoConfiguration.class,
                        TranslationProviderConfiguration.class))
                .run(context -> {
                    assertThat(context).hasSingleBean(TranslateUtils.class);
                    List<VO> records = List.of(new VO() { });
                    assertThat(TranslateUtils.translate(records)).isSameAs(records);
                    assertThat(context.getBean(RecordingTransService.class).records).isSameAs(records);
                });
    }

    @AutoConfiguration(after = MiniTranslateAutoConfiguration.class)
    static class TranslationProviderConfiguration {

        @Bean
        RecordingTransService transService() {
            return new RecordingTransService();
        }
    }

    static class RecordingTransService extends TransService {

        private List<? extends VO> records;

        @Override
        public void transBatch(List<? extends VO> records) {
            this.records = records;
        }
    }
}
