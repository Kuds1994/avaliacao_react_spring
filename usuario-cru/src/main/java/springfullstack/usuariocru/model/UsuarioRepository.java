package springfullstack.usuariocru.model;


import org.springframework.data.repository.CrudRepository;
import springfullstack.usuariocru.model.Usuario;

import java.util.Optional;

public interface UsuarioRepository extends CrudRepository<Usuario, Long> {

    Optional<Usuario> findByLoginusuario(String name);
}
