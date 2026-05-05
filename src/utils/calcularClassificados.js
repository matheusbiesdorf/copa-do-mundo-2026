import { calcularPontuacao } from './calcularPontuacao';

export function calcularClassificados(grupos, partidas) {
  const primeirosColocados = [];
  const segundosColocados = [];
  const terceirosColocados = [];

  grupos.forEach((grupo) => {
    const classificacao = calcularPontuacao(grupo, partidas);

    const primeiro = classificacao[0];
    const segundo = classificacao[1];
    const terceiro = classificacao[2];

    if (primeiro) {
      primeirosColocados.push({
        ...primeiro,
        grupo: grupo.id,
        posicao: 1,
        origem: `1º Grupo ${grupo.id}`,
      });
    }

    if (segundo) {
      segundosColocados.push({
        ...segundo,
        grupo: grupo.id,
        posicao: 2,
        origem: `2º Grupo ${grupo.id}`,
      });
    }

    if (terceiro) {
      terceirosColocados.push({
        ...terceiro,
        grupo: grupo.id,
        posicao: 3,
        origem: `3º Grupo ${grupo.id}`,
      });
    }
  });

  const melhoresTerceiros = [...terceirosColocados]
    .sort((a, b) => {
      return (
        b.pontos - a.pontos ||
        b.saldoGols - a.saldoGols ||
        b.golsPro - a.golsPro ||
        a.selecaoId.localeCompare(b.selecaoId)
      );
    })
    .slice(0, 8)
    .map((selecao, index) => ({
      ...selecao,
      rankingTerceiro: index + 1,
      origem: `${index + 1}º melhor terceiro`,
    }));

  const classificados = [...primeirosColocados, ...segundosColocados, ...melhoresTerceiros];

  return {
    primeirosColocados,
    segundosColocados,
    terceirosColocados,
    melhoresTerceiros,
    classificados,
  };
}
