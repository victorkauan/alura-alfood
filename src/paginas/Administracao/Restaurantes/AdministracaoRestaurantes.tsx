import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import type IRestaurante from "../../../interfaces/IRestaurante"

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  useEffect(() => {
    axios.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/')
      .then(response => setRestaurantes(response.data))
  }, [])

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
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map(restaurante => (
            <TableRow key={restaurante.id}>
              <TableCell>{restaurante.nome}</TableCell>
              <TableCell>
                [ <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link> ]
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AdministracaoRestaurantes
