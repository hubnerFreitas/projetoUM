import React, { useState, useMemo } from 'react';

import api from '../../services/api';

import camera from '../../assets/camera.svg';
import './styles.css'

export default function New({ history }) {
    const [empresa, setEmpresa] = useState('');
    const [techs, setTechs] = useState('');
    const [preco, setPreco] = useState('');
    const [imagem, setImagem] = useState(null);

    const preview = useMemo(() => {
        return imagem ? URL.createObjectURL(imagem) : null;}, [imagem])

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('imagem', imagem);
        data.append('empresa', empresa);
        data.append('preco', preco);
        data.append('techs', techs);

        await api.post('/spots', data, {
            headers: { user_id }
        });

        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label
                id="imagem"
                style={{ backgroundImage: `url(${preview})` }}
                className={imagem ? 'temImagem' : ''}
            >
                <input type="file" onChange={event => setImagem(event.target.files[0])} />
                <img src={camera} alt="Select img" />
            </label>

            <label htmlFor="empresa">EMPRESA *</label>
            <input
                id="empresa"
                placeholder="Sua empresa"
                value={empresa}
                onChange={event => setEmpresa(event.target.value)}
            />

            <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por virgula)</span></label>
            <input
                id="techs"
                placeholder="Tecnologias usadas na sua empresa"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />

            <label htmlFor="preco">VALOR DA DIÁRIA<span>(em branco para GRATUITO)</span> </label>
            <input
                id="preco"
                placeholder="Valor cobrado por dia"
                value={preco}
                onChange={event => setPreco(event.target.value)}
            />

            <button type="submit" className="btn">Cadastrar</button>
        </form>
    )
}