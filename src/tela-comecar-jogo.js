import { k } from "./main";

export function telaComeco() {
  k.add([
    k.sprite("fundo", {
      width: k.width(),
      height: k.height(),
    }),
    k.z(0),
  ]);
  const sobreposicao = k.add([k.rect(k.width(), k.height()), k.opacity(0)]);

  sobreposicao.add([
    k.sprite("comecarTexto"),
    k.anchor("center"),
    k.pos(k.center()),
    k.scale(1.5),
  ]);
  k.setGravity(0);

  sobreposicao.onMousePress(() => {
    sobreposicao.destroy();
    k.go("jogo");
  });
}
