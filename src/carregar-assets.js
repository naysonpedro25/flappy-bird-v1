import { k } from "./main";

export function carregarAssets(){
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
}