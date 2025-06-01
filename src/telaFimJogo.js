import { k } from "./main";

export function telaFimJogo() {
  const sobreposicao = k.add([k.rect(k.width(), k.height()), k.opacity(0)]);

  const titulo = sobreposicao.add([
    k.sprite("fimJogo"),
    k.anchor("center"),
    k.pos(k.center()),
    k.z(5),
    k.scale(1.5),
  ]);

  const botaoRecomecar = sobreposicao.add([
    k.sprite("recomecar", {
      width: 100,
      frame: 0,
    }),
    k.anchor("center"),
    k.pos(k.center().x, titulo.pos.y + 100),
  ]);

  botaoRecomecar.onMousePress(() => {
    sobreposicao.destroy();
    k.go("jogo");
  });
  botaoRecomecar.onTouchStart(() => {
    sobreposicao.destroy();
    k.go("jogo");
  });
  botaoRecomecar.onKeyPress(() => {
    sobreposicao.destroy();
    k.go("jogo");
  });
}
