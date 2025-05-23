import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdministracaoRestaurantes from './paginas/Administracao/Restaurantes/AdministracaoRestaurantes';
import FormularioRestaurante from './paginas/Administracao/Restaurantes/FormularioRestaurante';
import Base from './paginas/Administracao/Base';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurantes" element={<VitrineRestaurantes />} />
            <Route path="/admin" element={<Base />}>
                <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
                <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
                <Route path="restaurantes/:id" element={<FormularioRestaurante />} />
            </Route>
        </Routes>
    );
}

export default App;
