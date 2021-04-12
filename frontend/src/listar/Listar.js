import {useState, useEffect} from "react"
import {Link} from "react-router-dom";
import Moment from 'moment';
import 'moment/locale/pt-br';

import UsuariosDataServices from "../servicos/usuario.service";

import './index.css'

export default function Listar(){

    const [usuarios, setUsuarios] = useState([]);  
    const [lista, setLista] = useState([]); 
    

    useEffect(() => { 
        UsuariosDataServices.pegarTodos().then(response => {
            setUsuarios(response.data.sort((a, b) => a.id - b.id))
            setLista(response.data);
        })        
    }, [])

    const filtrar = (e) => {
        console.log(usuarios);
        if(e.length > 0){
            setUsuarios(lista.filter(u => u.nomeusuario.includes(e)))  
        }else{
            setUsuarios(lista)
        }        
    }

    const deletar = (id) => {
        UsuariosDataServices.deletar(id).then(() => {
            setUsuarios(usuarios.filter(u => u.id !== id))
        })
    }

    return (
       <div className="listar-usuarios">
           <h2>Lista de Usuários</h2>
           <div className="form-group">                 
                <input id="nome-usuario" placeholder="Busca usuário"  name="nome-usuario" onChange={e => filtrar(e.target.value)} className="form-control" type="text"/>
            </div>
           {
               usuarios.length > 0 ? 
           <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nome do Usuário</th>
                    <th scope="col">Login</th>
                    <th scope="col">Status</th>
                    <th scope="col">Último acesso</th>
                    <th scope="col">Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map((usu) =>   
                                <tr key={usu.id}>                      
                                    <th scope="row"> {usu.id} </th>
                                    <td> {usu.nomeusuario} </td>
                                    <td> {usu.loginusuario} </td> 
                                    {usu.ativo ? <td className="sucesso">Ativo</td> : <td className="falha">Desativado</td>}                                  
                                    <td> {Moment(usu.tmdataultimoacesso).format('DD/MM/yyy h:mm:ss a')} </td> 
                                    <td> <Link to={`/editar/${usu.id}`}id="editar-link" className="btn btn-primary">Editar</Link> <button type="button" onClick={(e) => {e.preventDefault(); deletar(usu.id)}} id="excluir-link" className="btn btn-danger">Excluir</button></td>                                   
                            </tr>
                        )
                    }                   
                </tbody>
                </table>
                : <h3>Nenhum usuário cadastrado.</h3>
            }
                <Link to="/cadastrar" id="cadastrar-link" className="btn btn-primary">Cadastrar</Link>
       </div>
    )
}