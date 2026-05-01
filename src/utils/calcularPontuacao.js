export function calcularPontuacao(grupo, partidas) {
  const classificacao = grupo.selecoes.map((selecaoId) => ({
    selecaoId,
    pontos: 0,
    jogos: 0,
    vitorias: 0,
    empates: 0,
    derrotas: 0,
    golsPro: 0,
    golsContra: 0,
    saldoGols: 0,
  }));

  const partidasDoGrupo = partidas.filter((partida) => partida.grupo === grupo.id);

  partidasDoGrupo.forEach((partida) => {
    const jogoAindaNaoAconteceu =
      partida.placarMandante === null || partida.placarVisitante === null;

    if (jogoAindaNaoAconteceu) {
      return;
    }

    const mandante = classificacao.find((item) => item.selecaoId === partida.mandante);

    const visitante = classificacao.find((item) => item.selecaoId === partida.visitante);

    if (!mandante || !visitante) {
      return;
    }

    mandante.jogos += 1;
    visitante.jogos += 1;

    mandante.golsPro += partida.placarMandante;
    mandante.golsContra += partida.placarVisitante;

    visitante.golsPro += partida.placarVisitante;
    visitante.golsContra += partida.placarMandante;

    mandante.saldoGols = mandante.golsPro - mandante.golsContra;
    visitante.saldoGols = visitante.golsPro - visitante.golsContra;

    if (partida.placarMandante > partida.placarVisitante) {
      mandante.vitorias += 1;
      mandante.pontos += 3;

      visitante.derrotas += 1;
    } else if (partida.placarMandante < partida.placarVisitante) {
      visitante.vitorias += 1;
      visitante.pontos += 3;

      mandante.derrotas += 1;
    } else {
      mandante.empates += 1;
      visitante.empates += 1;

      mandante.pontos += 1;
      visitante.pontos += 1;
    }
  });

  return classificacao.sort((a, b) => {
    return (
      b.pontos - a.pontos ||
      b.saldoGols - a.saldoGols ||
      b.golsPro - a.golsPro ||
      a.selecaoId.localeCompare(b.selecaoId)
    );
  });
}
