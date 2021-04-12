package springfullstack.usuariocru.model;

import lombok.Value;

import javax.persistence.Column;
import javax.validation.constraints.Size;
import java.util.Date;

@Value
public class UsuarioDTO {

    private String nomeusuario;
    @Size(min = 1, max = 12, message = "Login deve ter no maximo 12 letras")
    private String loginusuario;
    @Size(min = 1, max = 9, message = "Login deve ter no maximo 9 letras")
    private String senhausuario;
    private boolean ativo;
    private Date tmdataultimoacesso;
}
