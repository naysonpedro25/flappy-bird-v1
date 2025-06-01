import { VELOCIDADE_CANOS_E_BASE } from "./constantes";
import { k } from "./main";

export function criarBase() {
  k.add([
    k.sprite("base", {
      width: k.width(),
    }),
    k.area(),
    k.anchor("botleft"),
    k.z(2),
    k.pos(0, k.height() + 100),
    "base",
    "movimentar-base",
  ]);

  k.add([
    k.sprite("base", {
      width: k.width(),
    }),
    k.area(),
    k.z(2),
    k.anchor("botleft"),
    k.pos(k.width(), k.height() + 100),
    "base",
    "movimentar-base",
  ]);

  k.onUpdate("movimentar-base", (base) => {
    base.move(-VELOCIDADE_CANOS_E_BASE, 0);

    if (base.pos.x <= -k.width()) {
      base.pos.x += 2 * k.width();
    }
  });
}
