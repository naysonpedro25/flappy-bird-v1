import { FORCA_PULO } from "./constantes";
import { k } from "./main";

export function criarJogador() {
  const jogador = k.add([
    k.sprite("jogador", {
      anim: "parado",
    }),
    k.anchor("center"),
    k.pos(100, k.center().y + 100),
    k.area(),
    k.body(),
    k.z(2),
    "jogador",
  ]);

  function pular() {
    k.play("voar", {
      volume: 0.1,
    });
    jogador.jump(FORCA_PULO);
    jogador.play("subir");
    jogador.angle = -30;
  }

  jogador.onKeyPress("space", () => {
    pular();
  });

  jogador.onTouchStart(() => {
    pular();
  });
  jogador.onMousePress(() => {
    pular();
  });
  
  jogador.onFall(() => {
    jogador.play("parado");
  });

  jogador.onUpdate(() => {
    if (jogador.vel.y > 0) {
      jogador.angle += 180 * k.dt();
      if (jogador.angle > 60) {
        jogador.angle = 60;
      }
    }
  });
}
