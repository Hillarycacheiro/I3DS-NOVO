import { Route, Routes } from 'react-router';
import './App.css'

import Sobre from "./pages/Sobre"
import Home from './pages/Home';
import Header from './components/header/Header';
import Contato from './pages/Contato';
import NaoEncontrado from './pages/NaoEncontrado';
import Rodape from './components/Rodape/Rodape';


function App() {

  return (
    <>
      <Header />
      <div classNama="containerApp">
      <Routes> {/* Identifica todas as rotas do sistema */}
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} /> {/* Uma rota do sistema */}
        <Route path="/contato" element={<Contato />} />
        <Route path="/naoencontrado" element={<NaoEncontrado />} />
      </Routes>
      </div>

      <Rodape>CacheiroHi</Rodape>
    </>
  );
}


export default App;