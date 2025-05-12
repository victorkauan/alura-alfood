import { useEffect, useState } from 'react';
import axios from 'axios';
import type IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import type { IPaginacao } from '../../interfaces/IPaginacao';

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null)
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null)

  useEffect(() => {
    fetchRestaurants('http://localhost:8000/api/v1/restaurantes/')
  }, [])

  const fetchRestaurants = (url: string) => {
    axios.get<IPaginacao<IRestaurante>>(url)
      .then(response => {
        setRestaurantes(response.data.results)
        setPreviousPageUrl(response.data.previous)
        setNextPageUrl(response.data.next)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
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
