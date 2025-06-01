import {
  ESPACO_ENTRE_CANOS,
  INTERVALO_POR_CANO,
  VELOCIDADE_CANOS_E_BASE,
} from "./constantes";
import { k } from "./main";

export function criarGeradorDeCanos() {
  function porCano() {
    const novoCentro = k.rand(
      k.center().y - 100,
      k.height() - 100 - ESPACO_ENTRE_CANOS
    );

    const parDeCanos = k.add([k.pos(525, 0), k.z(0), "parCanos"]);

    const canoTop = parDeCanos.add([
      k.sprite("cano", {
        flipY: true,
        width: 80,
      }),
      k.area(),
      k.anchor("botleft"),
      k.z(1),
      k.pos(0, novoCentro - ESPACO_ENTRE_CANOS / 2),
      "cano",
    ]);

    const canoBottom = parDeCanos.add([
      k.sprite("cano", {
        width: 80,
      }),
      k.z(1),
      k.anchor("topleft"),
      k.area(),
      k.pos(0, novoCentro + ESPACO_ENTRE_CANOS / 2),
      "cano",
    ]);

    const areaPonto = parDeCanos.add([
      k.rect(1, ESPACO_ENTRE_CANOS),
      k.area(),
      k.opacity(0),
      k.anchor("center"),
      k.pos(canoTop.width, novoCentro),
      "pontuar",
    ]);

    parDeCanos.onUpdate(() => {
      parDeCanos.move(-VELOCIDADE_CANOS_E_BASE, 0);

      if (parDeCanos.pos.x < -80) {
        parDeCanos.destroy();
      }
    });
  }

  return k.loop(INTERVALO_POR_CANO, () => {
    porCano();
  });
}
