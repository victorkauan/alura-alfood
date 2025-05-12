import { useEffect, useState, type FormEvent } from "react"
import axios from "axios"
import { Button, TextField } from "@mui/material"
import {useParams} from "react-router-dom"
import type  IRestaurante from "../../../interfaces/IRestaurante"

const FormularioRestaurante = () => {
  const params = useParams()

  const [name, setName] = useState<string>('')

  useEffect(() => {
    if (params.id) {
      axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${params.id}/`)
        .then(response => setName(response.data.nome))
    }
  }, [params.id])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (params.id) {
      axios.patch(`http://localhost:8000/api/v2/restaurantes/${params.id}/`, { nome: name })
        .then(() => alert('Restaurante atualizado com sucesso.'))
    } else {
      axios.post('http://localhost:8000/api/v2/restaurantes/', { nome: name })
        .then(() => alert('Restaurante cadastrado com sucesso.'))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Nome do restaurante"
        variant="standard"
        value={name}
        onChange={event => setName(event.target.value)}
      />
      <Button type="submit" variant="outlined">Salvar</Button>
    </form>
  )
}

export default FormularioRestaurante
