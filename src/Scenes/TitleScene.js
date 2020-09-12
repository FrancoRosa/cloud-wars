import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
import { show, listener } from '../js/dom';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  preload() {
    this.add.image(250, 100, 'logo');
    show();
    listener();
  }

  create() {
    this.gameButton = new Button(this, config.midx, config.midy, 'blueButton1', 'blueButton2', 'Play', 'Game');
    this.optionsButton = new Button(this, config.midx, config.midy + 70, 'blueButton1', 'blueButton2', 'Options', 'Options');
    this.creditsButton = new Button(this, config.midx, config.midy + 140, 'blueButton1', 'blueButton2', 'Credits', 'Credits');
    this.creditsButton = new Button(this, config.midx, config.midy + 210, 'blueButton1', 'blueButton2', 'Scores', 'Scores');
    
    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(config.midx, config.midy - offset * 100, config.width, config.height),
    );
  }

  // eslint-disable-next-line class-methods-use-this
  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton,
    );
  }
}
