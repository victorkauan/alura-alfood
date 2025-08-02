import { type ChangeEvent, useEffect, useState, type FormEvent } from "react"
import { useParams } from "react-router-dom"
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import http from "../../../http"
import type IPrato from "../../../interfaces/IPrato"
import type ITag from "../../../interfaces/ITag"
import type IRestaurante from "../../../interfaces/IRestaurante"

const FormularioPrato = () => {
    const params = useParams()

    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [tag, setTag] = useState<string>('')
    const [restaurant, setRestaurant] = useState<string>('')
    const [image, setImage] = useState<File | null>(null)

    const [tags, setTags] = useState<ITag[]>([])
    const [restaurants, setRestaurants] = useState<IRestaurante[]>([])

    useEffect(() => {
        if (params.id) {
            http.get<IPrato>(`pratos/${params.id}/`)
                .then(response => {
                    setName(response.data.nome)
                    setDescription(response.data.descricao)
                    setTag(response.data.tag)
                    setRestaurant(String(response.data.restaurante))
                })
        }

        http.get<{ tags: ITag[] }>('tags/', )
            .then(response => setTags(response.data.tags))

        http.get<IRestaurante[]>('restaurantes/', )
            .then(response => setRestaurants(response.data))
    }, [params.id])

    const selectFile = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files?.length) {
            return
        }

        setImage(event.target.files[0])
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData()

        formData.append('nome', name)
        formData.append('descricao', description)
        formData.append('tag', tag)
        formData.append('restaurante', restaurant)

        if (image) {
            formData.append('imagem', image)
        }

        if (params.id) {
            http.request({
                url: `pratos/${params.id}/`,
                method: 'PATCH',
                headers: { 'Content-Type': 'multipart/form-data' },
                data: formData
            })
                .then(() => alert('Prato atualizado com sucesso.'))
                .catch(error => console.log(error))
        } else {
            http.request({
                url: 'pratos/',
                method: 'POST',
                headers: { 'Content-Type': 'multipart/form-data' },
                data: formData
            })
                .then(() => {
                    setName('')
                    setDescription('')
                    setTag('')
                    setRestaurant('')

                    alert('Prato cadastrado com sucesso.')
                })
                .catch(error => console.log(error))
        }
    }

    return (
        <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h6">Formulário de Pratos</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={handleSubmit}>
                <TextField
                    required
                    label="Nome do prato"
                    variant="standard"
                    value={name}
                    onChange={event => setName(event.target.value)}
                    margin="dense"
                    fullWidth
                />
                <TextField
                    required
                    label="Descrição do prato"
                    variant="standard"
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                    margin="dense"
                    fullWidth
                />
                <FormControl margin="dense" fullWidth>
                    <InputLabel id="tag-select">Tag</InputLabel>
                    <Select labelId="tag-select" value={tag} onChange={event => setTag(event.target.value)}>
                        {tags.map(tag => (
                            <MenuItem key={tag.id} value={tag.value}>
                                {tag.value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl margin="dense" fullWidth>
                    <InputLabel id="restaurant-select">Restaurante</InputLabel>
                    <Select labelId="restaurant-select" value={restaurant} onChange={event => setRestaurant(event.target.value)}>
                        {restaurants.map(restaurant => (
                            <MenuItem key={restaurant.id} value={restaurant.id}>
                                {restaurant.nome}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <input type="file" onChange={selectFile} />

                <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>Salvar</Button>
            </Box>
        </Box>
    )
}

export default FormularioPrato
