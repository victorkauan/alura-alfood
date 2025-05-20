import { useEffect, useState, type FormEvent } from "react"
import { useParams } from "react-router-dom"
import { Box, Button, TextField, Typography } from "@mui/material"
import http from "../../../http"
import type  IRestaurante from "../../../interfaces/IRestaurante"

const FormularioRestaurante = () => {
    const params = useParams()

    const [name, setName] = useState<string>('')

    useEffect(() => {
        if (params.id) {
            http.get<IRestaurante>(`restaurantes/${params.id}/`)
                .then(response => setName(response.data.nome))
        }
    }, [params.id])

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (params.id) {
          http.patch(`restaurantes/${params.id}/`, { nome: name })
              .then(() => alert('Restaurante atualizado com sucesso.'))
      } else {
          http.post('restaurantes/', { nome: name })
              .then(() => alert('Restaurante cadastrado com sucesso.'))
      }
    }

    return (
        <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={handleSubmit}>
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
