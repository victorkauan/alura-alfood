import { type FormEvent, useEffect, useState } from 'react';
import axios, { type AxiosRequestConfig } from 'axios';
import type IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import type { IPaginacao } from '../../interfaces/IPaginacao';
import type { IParametrosBusca } from '../../interfaces/IParametrosBusca';

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null)
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null)
  const [search, setSearch] = useState<string>('')

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

    fetchRestaurants('http://localhost:8000/api/v1/restaurantes/', options)
  }

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    <form onSubmit={handleSearchRestaurants}>
      <input type="text" value={search} onChange={event => setSearch(event.target.value)} />
      <button type="submit">Buscar</button>
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
  </section>)
}

export default ListaRestaurantes
