import './ListaPartidas.css';

function ListaPartidas({ partidas, selecoes }) {
  function buscarSelecao(selecaoId) {
    return selecoes.find((selecao) => selecao.id === selecaoId);
  }

  function formatarData(data) {
    const [ano, mes, dia] = data.split('-');

    return `${dia}/${mes}/${ano}`;
  }

  function partidaFinalizada(partida) {
    return (
      partida.status === 'finalizado' ||
      (partida.placarMandante !== null && partida.placarVisitante !== null)
    );
  }

  return (
    <section className="lista-partidas">
      <div className="lista-partidas-cabecalho">
        <h2>Jogos da fase de grupos</h2>
        <p>Confira datas, horários, grupos, rodadas e resultados.</p>
      </div>

      <div className="partidas-grid">
        {partidas.map((partida) => {
          const mandante = buscarSelecao(partida.mandante);
          const visitante = buscarSelecao(partida.visitante);
          const finalizada = partidaFinalizada(partida);

          return (
            <article className="card-partida" key={partida.id}>
              <div className="card-partida-topo">
                <span>Grupo {partida.grupo}</span>
                <span>Rodada {partida.rodada}</span>
              </div>

              <div className="card-partida-confronto">
                <div className="time-partida">
                  <img
                    src={mandante.bandeira}
                    alt={`Bandeira de ${mandante.nome}`}
                  />
                  <span>{mandante.nome}</span>
                </div>

                <div className="placar-partida">
                  {finalizada ? (
                    <>
                      <strong>{partida.placarMandante}</strong>
                      <span>x</span>
                      <strong>{partida.placarVisitante}</strong>
                    </>
                  ) : (
                    <span>x</span>
                  )}
                </div>

                <div className="time-partida time-partida-direita">
                  <img
                    src={visitante.bandeira}
                    alt={`Bandeira de ${visitante.nome}`}
                  />
                  <span>{visitante.nome}</span>
                </div>
              </div>

              <div className="card-partida-rodape">
                <span>
                  {formatarData(partida.data)} às {partida.hora}
                </span>

                <strong
                  className={
                    finalizada ? 'status-finalizado' : 'status-agendado'
                  }
                >
                  {finalizada ? 'Finalizado' : 'Agendado'}
                </strong>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default ListaPartidas;