import {useState, useEffect} from "react"
import {Link, useParams} from "react-router-dom";

import UsuariosDataServices from "../servicos/usuario.service";

import './index.css';

export default function Editar(){

    const { id } = useParams();

    const [usuario, setUsuario] = useState({
        id: '',
        nomeusuario: '',
        loginusuario: '',
        ativo: ''
    });

    const [mensagem, setMensagem] = useState({
        status: false,
    });

    const [repita, setRepita] = useState('');

    const mensagens = () => {
        if(mensagem.sucesso){
            return <div className="alert alert-success" role="alert">{mensagem.texto}</div>
        }else{
            return <div className="alert alert-danger" role="alert">{mensagem.texto}</div>
        }
    }

    useEffect(() => { 
        UsuariosDataServices.pegarUsuario(id).then(response => {
            setUsuario(response.data)         
        })        
    }, [id])  
    
    const salvar = (e) => {
        e.preventDefault(); 
        
        console.log(usuario.ativo);

        if(usuario.senhausuario !== repita){
            setMensagem({status: true, texto: 'Senhas não conferem', sucesso: false}); 
            return;
        }
        
        UsuariosDataServices.atualizar(id, usuario).then(response => {
            setMensagem({status: true, texto: "Atualizado com sucesso", sucesso: true})
        }).catch(error  => {
            console.log(error.response)
            setMensagem({status: true, texto: error.response.data.message, sucesso: false})
        });   ;  
    }

    return (
       <div className="section-cadastro">
           <h2>Editar Usuário</h2>
           <form className="cadastro-usuarios" onSubmit={salvar}>
                <div className="form-group">  
                        <label htmlFor={"nome-usuario"}>Nome do Usuário</label> 
                        <input value={usuario.nomeusuario} onChange={e => setUsuario({...usuario, nomeusuario: e.target.value})} id="nome-usuario" name="nome-usuario" className="form-control" type="text"/>
                </div>
                <div className="form-group"> 
                        <label htmlFor={"login-usuario"}>Login</label> 
                        <input value={usuario.loginusuario} name="login-usuario" onChange={e => setUsuario({...usuario, loginusuario: e.target.value})} className="form-control" type="text"/>
                </div>
                <div className="form-group"> 
                    <label htmlFor="senha-usuario">Senha</label> 
                    <input id="senha-usuario" name="senha-usuario" onChange={e => setUsuario({...usuario, senhausuario: e.target.value})} className="form-control" type="password"/>
                </div> 
                <div className="form-group"> 
                    <label htmlFor="repita-senha-usuario">Repita a senha</label> 
                    <input id="repita-senha-usuario" name="repita-senha-usuario" onChange={e => setRepita(e.target.value)} className="form-control" type="password"/>
                </div>
                <div className="form-check">
                    <input checked={usuario.ativo} onChange={e => setUsuario({...usuario, ativo: e.target.checked})} className="form-check-input" type="checkbox" id="defaultCheck1"/>
                    <label className="form-check-label" htmlFor="defaultCheck1">
                        Ativo
                    </label>
                </div> 
                <button id="atualizar-submit" className="btn btn-primary" type="submit">Atualizar</button>
                <Link to="/" id="voltar-link" className="btn btn-light" href="/cadastrar">Voltar</Link>
                { mensagem.status && mensagens() }
           </form>  
        </div>
    )
}