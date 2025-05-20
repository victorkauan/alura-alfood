import { useEffect, useState, type FormEvent } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { Box, Button, TextField, Typography } from "@mui/material"
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
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
        <Box component="form" onSubmit={handleSubmit}>
            <TextField
              required
              label="Nome do restaurante"
              variant="standard"
              value={name}
              onChange={event => setName(event.target.value)}
              fullWidth
            />
            <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>Salvar</Button>
        </Box>
    </Box>
  )
}

export default FormularioRestaurante
