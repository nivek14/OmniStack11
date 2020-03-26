import React, {useState} from 'react';
import './styles.css';
import heroesImg from '../../assests/heroes.png';
import logoImg from '../../assests/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api'; 

export default function logon(){

    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){

        e.preventDefault();

        try{    
            const reponse = await api.post('sessions', {id});
            console.log(response.data.name);
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile');
        }catch(err){
            alert('falha no login, tente novamente');
        }

    }

    return(

        <div className="logon-container">
            <section className="form">

                <img src={logoImg} alt="Be the hero"/>

                <form onSubmit={handleLogin}>

                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        Não tenho cadastro
                    </Link>

                </form>

            </section>

            <img src={heroesImg} alt="heroes"/>

        </div>

    );
}