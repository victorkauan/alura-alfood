import { useState, type FormEvent } from "react"
import axios from "axios"
import { Button, TextField } from "@mui/material"

const FormularioRestaurante = () => {
  const [name, setName] = useState<string>('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    axios.post('http://localhost:8000/api/v2/restaurantes/', { nome: name })
      .then(() => alert('Restaurante cadastrado com sucesso.'))
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
