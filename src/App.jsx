import selecoes from './data/selecoes.json';
import grupos from './data/grupos.json';
import partidas from './data/partidas.json';
import TabelaGrupo from './components/TabelaGrupo/TabelaGrupo';
import ListaPartidas from './components/ListaPartidas/ListaPartidas';
import './App.css';

function App() {
  return (
    <main>
      <h1>Tabela da Copa do Mundo</h1>

      <section className="grupos">
        {grupos.map((grupo) => (
          <TabelaGrupo key={grupo.id} grupo={grupo} selecoes={selecoes} partidas={partidas} />
        ))}
      </section>
      <ListaPartidas partidas={partidas} selecoes={selecoes} />
    </main>
  );
}

export default App;
