package nc.opt.refauto.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.HashMap;
import java.util.Map;

/**
 * Properties specific to Refauto.
 * <p>
 * Properties are configured in the application.yml file.
 * See {@link io.github.jhipster.config.JHipsterProperties} for a good example.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {

    private Map<String, Object> frontEnd = new HashMap<>();

    private Map<String, Object> backEnd = new HashMap<>();

    public Map<String, Object> getFrontEnd() {
        return frontEnd;
    }

    public Map<String, Object> getBackEnd() {
        return backEnd;
    }
}
