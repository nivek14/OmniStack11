import React, {useState} from 'react';
import './styles.css';
import logoImg from '../../assests/logo.svg';
import {Link, useHistory} from 'react-router-dom'; 
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api'; 

export default function NewIncident(){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try{
           await api.post('incidents', data, {
               headers: {
                   Authorization: ongId,
               }
           }); 
           history.push('/profile');
        }catch{
            alert('erro ao cadastrar caso, tente novamente')
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>

                    <img src={logoImg} alt="Be the hero"/>

                    <h1>Cadastrar Novo Caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para o problema</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Voltar para home
                    </Link>

                </section>

                <form onSubmit={handleNewIncident}>

                    <input 
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.title)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.description)}
                    />
                    <input 
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <div className="input-group">
                        <input placeholder="Cidade"/>
                        <input placeholder="UF" style={{width: 80}}/>
                    </div>

                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>
        </div>
    );
}
