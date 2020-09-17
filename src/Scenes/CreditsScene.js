import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
import dom from '../js/dom';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    dom.hide();
    this.sndEfect();
    const credits = 'Credits            Author: FrancoRosa         InspiredBy: JaredJork        github.com/FrancoRosa';
    this.menuButton = new Button(this, config.midx, config.midy + 170, 'Menu', 'Title');
    this.creditsText = this.add.text(config.width, config.height / 2, credits, { fontSize: '32px', fill: '#fff' });
  }

  update() {
    this.creditsText.x -= 4;
    if (this.creditsText.x < -2000) this.creditsText.x = config.width;
  }

  sndEfect() {
    this.sfx = {
      life: this.sound.add('sndLife'),
    };
    this.sfx.life.play();
  }
}