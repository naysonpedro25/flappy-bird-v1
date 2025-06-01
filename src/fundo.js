import { VELOCIDADE_FUNDO } from "./constantes";
import { k } from "./main";

export function criarFundoAnimado() {
  k.add([
    k.sprite("fundo", {
      width: k.width(),
      height: k.height(),
    }),
    k.pos(0, 0),
    "fundo",
    "movimentar-fundo"
  ]);

  k.add([
    k.sprite("fundo", {
      width: k.width(),
      height: k.height(),
    }),
    k.pos(k.width(), 0),
    "fundo",
    "movimentar-fundo"
  ]);

  k.onUpdate(() => {
    k.get("movimentar-fundo").forEach((fundo) => {
      fundo.move(-VELOCIDADE_FUNDO, 0);

      if (fundo.pos.x <= -k.width()) {
        fundo.pos.x += 2 * k.width();
      }
    });
  });
}
