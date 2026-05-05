import './ClassificadosMataMata.css';
import { calcularClassificados } from '../../utils/calcularClassificados';

function ClassificadosMataMata({ grupos, partidas, selecoes }) {
  const { primeirosColocados, segundosColocados, melhoresTerceiros } = calcularClassificados(
    grupos,
    partidas,
  );

  function buscarSelecao(selecaoId) {
    return selecoes.find((selecao) => selecao.id === selecaoId);
  }

  function renderizarCard(classificado) {
    const selecao = buscarSelecao(classificado.selecaoId);

    return (
      <article
        className="card-classificado"
        key={`${classificado.origem}-${classificado.selecaoId}`}
      >
        <div className="origem-classificado">{classificado.origem}</div>

        <div className="selecao-classificada">
          <img src={selecao.bandeira} alt={`Bandeira de ${selecao.nome}`} />
          <strong>{selecao.nome}</strong>
        </div>

        <div className="dados-classificado">
          <span>{classificado.pontos} pts</span>
          <span>SG {classificado.saldoGols}</span>
          <span>GP {classificado.golsPro}</span>
        </div>
      </article>
    );
  }

  return (
    <section className="classificados-mata-mata">
      <div className="classificados-cabecalho">
        <h2>Classificados ao mata-mata</h2>
        <p>Os dois primeiros de cada grupo e os oito melhores terceiros avançam.</p>
      </div>

      <div className="bloco-classificados">
        <h3>Primeiros colocados</h3>
        <div className="classificados-grid">{primeirosColocados.map(renderizarCard)}</div>
      </div>

      <div className="bloco-classificados">
        <h3>Segundos colocados</h3>
        <div className="classificados-grid">{segundosColocados.map(renderizarCard)}</div>
      </div>

      <div className="bloco-classificados">
        <h3>Melhores terceiros</h3>
        <div className="classificados-grid">{melhoresTerceiros.map(renderizarCard)}</div>
      </div>
    </section>
  );
}

export default ClassificadosMataMata;
