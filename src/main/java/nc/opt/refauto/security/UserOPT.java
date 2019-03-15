package nc.opt.refauto.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Created by 2617ray on 02/03/2017.
 */
public class UserOPT extends User {

    private String uid;
    private String nom;
    private String prenom;
    private Map<String, List<String>> ressources;

    public UserOPT(String uid, String nom, String prenom, Collection<? extends GrantedAuthority> roles, Map<String, List<String>> ressources) {
        super(uid, "", roles);
        this.uid = uid;
        this.nom = nom;
        this.prenom = prenom;
        this.ressources = ressources;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public Map<String, List<String>> getRessources() {
        return ressources;
    }

    public void setRessources(Map<String, List<String>> ressources) {
        this.ressources = ressources;
    }

    public List<String> getRoles() {
        return getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
    }

    @Override
    public String toString() {
        return "UserOPT{" +
            "uid='" + uid + '\'' +
            ", nom='" + nom + '\'' +
            ", prenom='" + prenom + '\'' +
            ", roles='" + getAuthorities() + '\'' +
            ", ressources=" + ressources +
            '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass() || !super.equals(o)) return false;
        UserOPT userOPT = (UserOPT) o;
        return Objects.equals(uid, userOPT.uid) &&
            Objects.equals(nom, userOPT.nom) &&
            Objects.equals(prenom, userOPT.prenom) &&
            Objects.equals(ressources, userOPT.ressources);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), uid, nom, prenom, ressources);
    }
}
