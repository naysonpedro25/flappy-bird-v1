import { k } from "./main";

let valor = 0;
export function contador() {
  const contador = k.add([k.pos(10, 10), k.z(10)]);

  const centena = contador.add([
    k.sprite("contador", {
      frame: 0,
    }),
    k.pos(0, 0),
    "centena",
  ]);
  const dezena = contador.add([
    k.sprite("contador", {
      frame: 0,
    }),
    k.pos(centena.width, 0),
    "dezena",
  ]);
  const unidade = contador.add([
    k.sprite("contador", {
      frame: 0,
    }),
    k.pos(centena.width * 2, 0),
    "unidade",
  ]);

  function adcionarPonto() {
    valor++;
    const valorString = valor.toString();
    if (valorString.length === 1) {
      unidade.frame = Number(valorString);
    } else if (valorString.length === 2) {
      dezena.frame = Number(valorString.at(0));
      unidade.frame = Number(valorString.at(1));
    } else if (valorString.length === 3) {
      centena.frame = Number(valorString.at(0));
      dezena.frame = Number(valorString.at(1));
      unidade.frame = Number(valorString.at(2));
    }
  }

  function resetarPontos() {
    valor = 0;
  }

  return {
    adcionarPonto,
  };
}
