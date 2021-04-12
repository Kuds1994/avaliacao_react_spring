package springfullstack.usuariocru.controllers;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import springfullstack.usuariocru.controllers.errors.ErrorDetails;
import springfullstack.usuariocru.model.Usuario;
import springfullstack.usuariocru.model.UsuarioRepository;

import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Date;

@RestController
@RequestMapping("/api/usuario")
public class UsuarioController {
    private final UsuarioRepository usuarioRepository;

    UsuarioController(UsuarioRepository usuarioRepository){
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid Usuario usuario){

        Date date = new Date();
        Timestamp ts = new Timestamp(date.getTime());

        usuario.setTmdataultimoacesso(ts);

        try{
            usuarioRepository.save(usuario);
        }catch (Exception ex){
            if(ex instanceof DataIntegrityViolationException ){
                ErrorDetails errorDetails = new ErrorDetails(new Date(), "Login já cadastrado", "");
                return new ResponseEntity(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping
    ResponseEntity<Iterable<Usuario>> getResult(){
        return ResponseEntity.ok(usuarioRepository.findAll());
    }

    @GetMapping(path = {"/{id}"})
    ResponseEntity<Usuario> getUsuario(@PathVariable long id){
        return usuarioRepository.findById(id).map(
                usuario -> ResponseEntity.ok().body(usuario)
        ).orElse(ResponseEntity.notFound().build());
    }
    @PutMapping(value = "/{id}")
    ResponseEntity<?> atualizar(@PathVariable("id") long id, @RequestBody @Valid Usuario usuario){
        return usuarioRepository.findById(id).map(
                u -> {
                    u.setNomeusuario(usuario.getNomeusuario());
                    u.setLoginusuario(usuario.getLoginusuario());
                    u.setSenhausuario(usuario.getSenhausuario());
                    u.setAtivo(usuario.isAtivo());

                    try{
                        usuarioRepository.save(usuario);
                    }catch (Exception ex){
                        if(ex instanceof DataIntegrityViolationException ){
                            ErrorDetails errorDetails = new ErrorDetails(new Date(), "Login já cadastrado", "");
                            return new ResponseEntity(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
                        }
                        return ResponseEntity.badRequest().build();
                    }

                    return ResponseEntity.ok().build();
                }
        ).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping(path = {"/{id}"})
    ResponseEntity<?> delete(@PathVariable long id){
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    usuarioRepository.delete(usuario);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
