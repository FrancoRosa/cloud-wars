import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
import { show } from '../js/dom';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  preload() {
    this.add.image(250, 100, 'logo');
    show();
  }

  create() {
    this.sndEfect()
    this.gameButton = new Button(this, config.midx, config.midy, 'Play', 'Game');
    this.optionsButton = new Button(this, config.midx, config.midy + 70, 'Options', 'Options');
    this.creditsButton = new Button(this, config.midx, config.midy + 140, 'Credits', 'Credits');
    this.ScoresButton = new Button(this, config.midx, config.midy + 210, 'Scores', 'Scores');

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }

  sndEfect() {
    this.sfx = {
      life: this.sound.add('sndLife'),
    };
    this.sfx.life.play();
  }
}
