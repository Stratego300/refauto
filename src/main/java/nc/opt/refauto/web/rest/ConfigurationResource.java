package nc.opt.refauto.web.rest;

import nc.opt.refauto.config.ApplicationProperties;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Created by 2617ray on 03/04/2017.
 */
@RestController
@RequestMapping("/management/configuration")
public class ConfigurationResource {

    private ApplicationProperties applicationProperties;

    public ConfigurationResource(ApplicationProperties applicationProperties) {
        this.applicationProperties = applicationProperties;
    }

    /**
     * Enpoint responsible for delivering front-end configuration.
     *
     * This configuration is specified in the application-{profile}.yml
     * under the application.frontend key
     *
     * @return The frontend configuration for the application
     */
    @GetMapping
    public Map<String, Object> getList() {
        return applicationProperties.getFrontEnd();
    }

}
