import { Outlet, Link as RouterLink } from "react-router-dom"
import { AppBar, Box, Button, Container, Link, Paper, Toolbar, Typography } from "@mui/material"

const NABVAR_ITEMS = [
    { to: "/admin/restaurantes", title: "Restaurantes" },
    { to: "/admin/restaurantes/novo", title: "Novo Restaurante" },
    { to: "/admin/pratos", title: "Pratos" },
    { to: "/admin/pratos/novo", title: "Novo Prato" },
]

type TNavBarItemProps = {
    to: string;
    title: string;
}

export default function Base() {
    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h6">
                            Administração
                        </Typography>
                        <Box sx={{ display: 'flex', flexGrow: 1 }}>
                            {NABVAR_ITEMS.map(navBarItem => <NavBarItem key={navBarItem.to} {...navBarItem} />)}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box>
                <Container maxWidth="lg" sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        <Outlet />
                    </Paper>
                </Container>
            </Box>
        </>
    )
}

function NavBarItem({ to, title }: TNavBarItemProps) {
  return (
    <Link component={RouterLink} to={to}>
        <Button sx={{ my: 2, color: 'white' }}>
            {title}
        </Button>
    </Link>
  )
}
