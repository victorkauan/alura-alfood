import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import type IRestaurante from "../../../interfaces/IRestaurante"

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  useEffect(() => {
    axios.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/')
      .then(response => setRestaurantes(response.data))
  }, [])

  const deleteRestaurant = (id: number) => {
    axios.delete(`http://localhost:8000/api/v2/restaurantes/${id}/`)
      .then(() => {
        const restaurantesNovos = restaurantes.filter(restaurante => restaurante.id !== id)
        setRestaurantes(restaurantesNovos)
      })
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Nome
            </TableCell>
            <TableCell>
              Editar
            </TableCell>
            <TableCell>
              Excluir
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map(restaurante => (
            <TableRow key={restaurante.id}>
              <TableCell>{restaurante.nome}</TableCell>
              <TableCell>
                [ <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link> ]
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteRestaurant(restaurante.id)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AdministracaoRestaurantes
