import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

export default function Dashboard() {
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });
            setSpots(response.data);
        }

        loadSpots();
    }, []);

    return (
        <>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot.id}>
                        <header style={{ backgroundImage: `url(${spot.imagem_url})` }}/>
                        <strong>{spot.empresa}</strong>
                        <span>{spot.preco ? `R$${spot.preco}/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
                <button className="btn">Cadastrar novo spot</button>
            </Link>
        </>
    );
}