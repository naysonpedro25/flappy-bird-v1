import kaplay from "kaplay";
import { criarJogador } from "./jogador";
import { GRAVIDADE } from "./constantes";
import { criarFundoAnimado } from "./fundo";
import { criarBase } from "./base";
import { telaComeco } from "./tela-comecar-jogo";
import { telaFimJogo } from "./tela-fim-jogo";
import { criarGeradorDeCanos } from "./canos";
import { contador } from "./contador";
import { carregarAssets } from "./carregar-assets";

const isMobile = window.innerWidth <= 525;
export const k = kaplay({
  background: "000000",
  width: isMobile ? window.innerWidth : 425,
  height: isMobile ? window.innerHeight : 767,
  scale: isMobile ? 1 : window.innerWidth / 425,
  stretch: isMobile,
  letterbox: !isMobile,
  touchToMouse: true,
});

carregarAssets();

telaComeco();

k.scene("jogo", () => {
  k.setGravity(GRAVIDADE);

  criarFundoAnimado();
  criarJogador();
  criarBase();
  const contadorPontos = contador();
  const geradorCanos = criarGeradorDeCanos();
  colisoesMortes(contadorPontos, geradorCanos);
  colisaoPontuacao(contadorPontos);
});

function colisaoPontuacao(contadorPontos) {
  k.onCollide("jogador", "pontuar", () => {
    k.play("pontuar", {
      volume: 0.1,
    });
    contadorPontos.adcionarPonto();
  });
}

function colisoesMortes(contadorPontos, geradorCanos) {
  k.onCollide("jogador", "base", (jogador, base) => {
    morte();
    jogador.paused = true;
  });

  k.onCollide("jogador", "cano", (jogador, cano) => {
    morte();

    jogador.collisionIgnore.push("base");
    jogador.collisionIgnore.push("cano");

    k.onUpdate("jogador", (jogador) => {
      jogador.move(0, 100);
      if (jogador.pos.y > k.height()) {
        jogador.destroy();
      }
    });
  });

  function morte() {
    k.play("morte", {
      volume: 0.1,
    });
    k.play("fimJogo");

    k.get("base").forEach((base) => base.untag("movimentar-base"));
    k.get("fundo").forEach((base) => base.untag("movimentar-fundo"));
    k.get("parCanos").forEach((par) => (par.paused = true));
    geradorCanos.cancel();
    contadorPontos.resetarPontos();
    telaFimJogo();
  }
}
