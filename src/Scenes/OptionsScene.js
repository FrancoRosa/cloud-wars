import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
import { hide } from '../js/dom';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  preload() {
    hide();
    this.add.image(250, 100, 'logo');
  }

  create() {
    this.sndEfect();
    this.model = this.sys.game.globals.model;

    this.musicButton = this.add.image(130, 250, 'checkedBox');
    this.musicText = this.add.text(160, 240, 'Music Enabled', { fontSize: 24 });

    this.soundButton = this.add.image(130, 300, 'checkedBox');
    this.soundText = this.add.text(160, 290, 'Sound Enabled', { fontSize: 24 });

    this.musicButton.setInteractive();
    this.soundButton.setInteractive();

    this.musicButton.on('pointerdown', () => {
      this.model.musicOn = !this.model.musicOn;
      this.updateAudio();
    });

    this.soundButton.on('pointerdown', () => {
      this.model.soundOn = !this.model.soundOn;
      this.updateAudio();
    });

    this.menuButton = new Button(this, config.midx, config.midy + 70, 'Menu', 'Title');

    this.updateAudio();
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setTexture('box');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('checkedBox');
      if (this.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    }

    if (this.model.soundOn === false) {
      this.soundButton.setTexture('box');
    } else {
      this.soundButton.setTexture('checkedBox');
    }
  }

  sndEfect() {
    this.sfx = {
      life: this.sound.add('sndLife'),
    };
    this.sfx.life.play();
  }
}
