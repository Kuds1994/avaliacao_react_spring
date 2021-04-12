import {useState} from "react"
import {Link} from "react-router-dom";

import UsuariosDataServices from "../servicos/usuario.service";

import './index.css';

export default function Cadastrar(){

    const [usuario, setUsuario] = useState({
        nomeusuario: '',
        loginusuario: '',
        senhausuario:'',
        ativo: false,             
    })

    const [repita, setRepita] = useState('');

    const [mensagem, setMensagem] = useState({
        status: false,
    });

    const mensagens = () => {
        if(mensagem.sucesso){
            return <div className="alert alert-success" role="alert">{mensagem.texto}</div>
        }else{
            return <div className="alert alert-danger" role="alert">{mensagem.texto}</div>
        }
    }


    const salvar = (e) => {
        e.preventDefault();

        if(usuario.senhausuario !== repita){
            setMensagem({status: true, texto: 'Senhas não conferem', sucesso: false}); 
            return;
        }

        UsuariosDataServices.cadastrarUsuario(usuario).then(response => {
            setMensagem({status: true, texto: "Salvo com sucesso", sucesso: true})
        })
        .catch(error  => {
            console.log(error.response)
            setMensagem({status: true, texto: error.response.data.message, sucesso: false})
        });   
    }

    return (
       <div className="section-cadastro">
           <h2>Cadastrar Usuário</h2>
           <form className="cadastro-usuarios" onSubmit={salvar}>
                <div className="form-group">  
                    <label htmlFor="nome-usuario">Nome do Usuário</label> 
                    <input id="nome-usuario" name="nome-usuario" onChange={e => setUsuario({...usuario, nomeusuario: e.target.value})} className="form-control" type="text"/>
                </div>
                <div className="form-group"> 
                    <label htmlFor="login-usuario">Login</label> 
                    <input id="login-usuario" name="login-usuario" onChange={e => setUsuario({...usuario, loginusuario: e.target.value})} className="form-control" type="text"/>
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
                    <input onChange={e => setUsuario({...usuario, ativo: e.target.checked})} className="form-check-input" type="checkbox" id="defaultCheck1"/>
                    <label className="form-check-label" htmlFor="defaultCheck1">
                        Ativo
                    </label>
                </div>          

                <button id="cadastro-submit" className="btn btn-primary" type="submit">Cadastrar</button>
                <Link to="/" id="voltar-link" className="btn btn-light" href="/cadastrar">Voltar</Link>
                { mensagem.status && mensagens() }
           </form>  
        </div>
    )
}