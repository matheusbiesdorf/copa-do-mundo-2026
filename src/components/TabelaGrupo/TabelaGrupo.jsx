import './TabelaGrupo.css';
import { calcularPontuacao } from '../../utils/calcularPontuacao';

function TabelaGrupo({ grupo, selecoes, partidas }) {
  const classificacao = calcularPontuacao(grupo, partidas);

  function buscarSelecao(selecaoId) {
    return selecoes.find((selecao) => selecao.id === selecaoId);
  }

  function definirClasseLinha(posicao) {
    if (posicao <= 2) {
      return 'classificado-direto';
    }

    if (posicao === 3) {
      return 'possivel-classificado';
    }

    return 'eliminado';
  }

  function definirStatus(posicao) {
    if (posicao <= 2) {
      return 'Classificado';
    }

    if (posicao === 3) {
      return '3º colocado';
    }

    return 'Fora';
  }

  return (
    <section className="tabela-grupo">
      <h2>{grupo.nome}</h2>

      <table>
        <thead>
          <tr>
            <th>Pos</th>
            <th>Seleção</th>
            <th>P</th>
            <th>J</th>
            <th>V</th>
            <th>E</th>
            <th>D</th>
            <th>GP</th>
            <th>GC</th>
            <th>SG</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {classificacao.map((item, index) => {
            const selecao = buscarSelecao(item.selecaoId);
            const posicao = index + 1;

            return (
              <tr key={item.selecaoId} className={definirClasseLinha(posicao)}>
                <td>{posicao}</td>

                <td>
                  <div className="selecao-tabela">
                    <img src={selecao.bandeira} alt={`Bandeira de ${selecao.nome}`} />
                    <span>{selecao.nome}</span>
                  </div>
                </td>

                <td>{item.pontos}</td>
                <td>{item.jogos}</td>
                <td>{item.vitorias}</td>
                <td>{item.empates}</td>
                <td>{item.derrotas}</td>
                <td>{item.golsPro}</td>
                <td>{item.golsContra}</td>
                <td>{item.saldoGols}</td>
                <td>
                  <span className="status-classificacao">{definirStatus(posicao)}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default TabelaGrupo;
