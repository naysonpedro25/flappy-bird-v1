import kaplay from "kaplay";
import { criarJogador } from "./jogador";
import { GRAVIDADE } from "./constantes";
import { criarFundoAnimado } from "./fundo";
import { criarBase } from "./base";
import { telaComeco } from "./telaComeco";
import { telaFimJogo } from "./telaFimJogo";
import { criarGeradorDeCanos } from "./canos";
import { contador } from "./contador";

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

k.loadRoot("./");

k.loadSound("voar", "sounds/wing.wav");
k.loadSound("morte", "sounds/hit.wav");
k.loadSound("fimJogo", "sounds/die.wav");
k.loadSound("pontuar", "sounds/point.wav");

k.loadSprite("fundo", "sprites/background-day.png");
k.loadSprite("comecarTexto", "sprites/message.png");
k.loadSprite("fimJogo", "sprites/gameover.png");
k.loadSprite("base", "sprites/base.png");
k.loadSprite("cano", "sprites/pipe-green.png");
k.loadSprite("recomecar", "sprites/replay.png", {
  sliceY: 2,
});

k.loadSprite("jogador", "sprites/yellowbird-sprites.png", {
  sliceX: 3,
  sliceY: 1,
  anims: {
    parado: {
      from: 0,
      to: 2,
      loop: true,
      speed: 7,
    },
    subir: {
      from: 0,
      to: 0,
      loop: false,
    },
  },
});
k.loadSprite("contador", "sprites/counter-sprites.png", {
  sliceX: 10,
  sliceY: 1,
});

telaComeco();

k.scene("jogo", () => {
  criarFundoAnimado();
  criarJogador();
  criarBase();
  const contadorPontos = contador();

  const gerador = criarGeradorDeCanos();

  function morte(jogador, objeto) {
    if (!jogador || !objeto) return;
    k.play("morte", {
      volume: 0.1,
    });
    k.play("fimJogo");

    if (objeto.is("cano")) {
      jogador.collisionIgnore.push("base");
      jogador.collisionIgnore.push("cano");

      k.onUpdate("jogador", (jogador) => {
        jogador.move(0, 100);
        if (jogador.pos.y > k.height()) {
          jogador.destroy();
        }
      });
    } else {
      jogador.paused = true;
    }

    k.get("base").forEach((base) => base.untag("movimentar-base"));
    k.get("fundo").forEach((base) => base.untag("movimentar-fundo"));
    k.get("parCanos").forEach((par) => (par.paused = true));
    gerador.cancel();
    telaFimJogo();
  }

  k.onCollide("jogador", "base", (jogador, base) => {
    morte(jogador, base);
  });

  k.onCollide("jogador", "cano", (jogador, cano) => {
    morte(jogador, cano);
  });

  k.onCollide("jogador", "pontuar", () => {
    k.play("pontuar", {
      volume: 0.1,
    });
    contadorPontos.adcionarPonto();
  });

  k.setGravity(GRAVIDADE);
});
