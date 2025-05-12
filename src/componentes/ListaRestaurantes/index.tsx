import { useEffect, useState } from 'react';
import axios from 'axios';
import type IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import type { IPaginacao } from '../../interfaces/IPaginacao';

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [nextPageUrl, setNextPageUrl] = useState<string>('')

  useEffect(() => {
    axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
      .then(response => {
        setRestaurantes(response.data.results)
        setNextPageUrl(response.data.next)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const seeMore = () => {
    axios.get<IPaginacao<IRestaurante>>(nextPageUrl)
      .then(response => {
        setRestaurantes([...restaurantes, ...response.data.results])
        setNextPageUrl(response.data.next)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {nextPageUrl && <button onClick={seeMore}>Ver mais</button>}
  </section>)
}

export default ListaRestaurantes
