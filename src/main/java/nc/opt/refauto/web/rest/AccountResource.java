package nc.opt.refauto.web.rest;

import nc.opt.refauto.security.UserOPT;
import nc.opt.refauto.service.dto.security.UserDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

/**
 * REST controller for managing the current user's account.
 */
@RestController
@RequestMapping("/api")
public class AccountResource {

    private final Logger log = LoggerFactory.getLogger(AccountResource.class);

    /**
     * GET  /account : get the current user.
     *
     * @return the ResponseEntity with status 200 (OK) and the current user in body, or status 500 (Internal Server Error) if the user couldn't be returned
     */
    @GetMapping("/account")
    public ResponseEntity<UserDTO> getAccount() {
        log.debug("Requesting user account from JWT Token");
        return Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication().getPrincipal())
            .filter(user -> user instanceof UserOPT)
            .map(user -> new ResponseEntity<>(new UserDTO((UserOPT) user), HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.FORBIDDEN));
    }

}
