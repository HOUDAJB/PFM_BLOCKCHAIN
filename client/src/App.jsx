import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Exercice1 from './pages/Exercice1'
import Exercice2 from './pages/Exercice2'
import Exercice3 from './pages/Exercice3'
import Exercice4 from './pages/Exercice4'
import Exercice5 from './pages/Exercice5'
import Exercice6 from './pages/Exercice6'
import Exercice7 from './pages/Exercice7'
import Exercice8 from './pages/Exercice8'

export default function App() {
  return (
    <>
      <Header />
      <main className="page-wrapper">
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/exercice1"  element={<Exercice1 />} />
          <Route path="/exercice2"  element={<Exercice2 />} />
          <Route path="/exercice3"  element={<Exercice3 />} />
          <Route path="/exercice4"  element={<Exercice4 />} />
          <Route path="/exercice5"  element={<Exercice5 />} />
          <Route path="/exercice6"  element={<Exercice6 />} />
          <Route path="/exercice7"  element={<Exercice7 />} />
          <Route path="/exercice8"  element={<Exercice8 />} />
        </Routes>
      </main>
    </>
  )
}
