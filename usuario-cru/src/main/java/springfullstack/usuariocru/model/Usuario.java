package springfullstack.usuariocru.model;




import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbusuario", uniqueConstraints = {@UniqueConstraint(columnNames = "loginusuario", name = "tbusuario_nmloginusuario_key")})
public class Usuario {

    @Id
    @SequenceGenerator(name="id_usuario_seq", sequenceName = "id_usuario_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "id_usuario_seq")
    @Column(name = "idusuario")
    private Long id;

    /*idusuario integer NOT NULL serial,
    nomeusuario character varying(80) NOT NULL,
    loginusuario character varying(12) NOT NULL,
    senhausuario character varying(9) NOT NULL,
    ativo boolean NOT NULL DEFAULT true,
    tmdataultimoacesso timestamp without time zone default current_timestamp,
    CONSTRAINT tbusuario_pk PRIMARY KEY (idusuario),
    CONSTRAINT tbusuario_nmloginusuario_key UNIQUE (loginusuario)*/

    @Column(columnDefinition = "character varying(80) NOT NULL")
    private String nomeusuario;
    @Column(columnDefinition = "character varying(12) NOT NULL")
    @Size(min = 1, max = 12, message = "Login deve ter no maximo 12 letras")
    private String loginusuario;
    @Column(columnDefinition = "character varying(9) NOT NULL")
    @Size(min = 1, max = 9, message = "Login deve ter no maximo 9 letras")
    private String senhausuario;
    @Column(columnDefinition = "boolean NOT NULL default true")
    private boolean ativo;
    @Column(columnDefinition = "timestamp without time zone")
    private Date tmdataultimoacesso;

}
