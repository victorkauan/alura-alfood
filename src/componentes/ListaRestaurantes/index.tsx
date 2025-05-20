import { type FormEvent, useEffect, useState } from 'react';
import axios, { type AxiosRequestConfig } from 'axios';
import Restaurante from './Restaurante';
import type IRestaurante from '../../interfaces/IRestaurante';
import type { IPaginacao } from '../../interfaces/IPaginacao';
import type { IParametrosBusca } from '../../interfaces/IParametrosBusca';
import style from './ListaRestaurantes.module.scss';

const ListaRestaurantes = () => {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null)
    const [nextPageUrl, setNextPageUrl] = useState<string | null>(null)
    const [search, setSearch] = useState<string>('')
    const [sortBy, setSortBy] = useState<string>('')

    useEffect(() => {
        fetchRestaurants('http://localhost:8000/api/v1/restaurantes/')
    }, [])

    const fetchRestaurants = (url: string, options: AxiosRequestConfig = {}) => {
        axios.get<IPaginacao<IRestaurante>>(url, options)
            .then(response => {
                setRestaurantes(response.data.results)
                setPreviousPageUrl(response.data.previous)
                setNextPageUrl(response.data.next)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleSearchRestaurants = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const options = { params: {} as IParametrosBusca }

        if (search) {
            options.params.search = search
        }
        
        if (sortBy) {
            options.params.ordering = sortBy
        }

        fetchRestaurants('http://localhost:8000/api/v1/restaurantes/', options)
    }

    return (
        <section className={style.ListaRestaurantes}>
            <h1>Os restaurantes mais <em>bacanas</em>!</h1>
            <form onSubmit={handleSearchRestaurants}>
                <div>
                    <input type="text" value={search} onChange={event => setSearch(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="sortBy">Ordenação</label>
                    <select id="sortBy" value={sortBy} onChange={event => setSortBy(event.target.value)}>
                        <option value="">Padrão</option>
                        <option value="id">ID</option>
                        <option value="nome">Nome</option>
                    </select>
                </div>
                <div>
                    <button type="submit">Buscar</button>
                </div>
            </form>
            {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
            <button
                onClick={() => previousPageUrl && fetchRestaurants(previousPageUrl)}
                disabled={!previousPageUrl}
            >
                Página anterior
            </button>
            <button
                onClick={() => nextPageUrl && fetchRestaurants(nextPageUrl)}
                disabled={!nextPageUrl}
            >
                Próxima página
            </button>
        </section>
    )
}

export default ListaRestaurantes
