import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import http from "../../../http"
import type IPrato from "../../../interfaces/IPrato"

const AdministracaoPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([])

  useEffect(() => {
      http.get<IPrato[]>('pratos/')
          .then(response => setPratos(response.data))
  }, [])

  const deleteDish = (id: number) => {
      http.delete(`pratos/${id}/`)
          .then(() => {
              const pratosNovos = pratos.filter(prato => prato.id !== id)
              setPratos(pratosNovos)
          })
  }

  return (
      <TableContainer component={Paper}>
          <Table>
              <TableHead>
                  <TableRow>
                      <TableCell>Nome</TableCell>
                      <TableCell>Tag</TableCell>
                      <TableCell>Imagem</TableCell>
                      <TableCell>Editar</TableCell>
                      <TableCell>Excluir</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {pratos.map(prato => (
                      <TableRow key={prato.id}>
                          <TableCell>{prato.nome}</TableCell>
                          <TableCell>{prato.tag}</TableCell>
                          <TableCell>
                              [ <a href={prato.imagem} target="_blank" rel="noreferrer">Ver imagem</a> ]
                          </TableCell>
                          <TableCell>
                              [ <Link to={`/admin/pratos/${prato.id}`}>Editar</Link> ]
                          </TableCell>
                          <TableCell>
                              <Button
                                  variant="outlined"
                                  color="error"
                                  onClick={() => deleteDish(prato.id)}
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

export default AdministracaoPratos
