import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
import { hide } from '../js/dom';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    hide();
    const credits = 'Credits            Author: FrancoRosa         InspiredBy: JaredJork        github.com/FrancoRosa';
    this.menuButton = new Button(this, config.midx, config.midy + 170, 'blueButton1', 'blueButton2', 'Menu', 'Title');
    this.creditsText = this.add.text(config.width, config.height / 2, credits, { fontSize: '32px', fill: '#fff' });
  }

  update() {
    this.creditsText.x -= 4;
    if (this.creditsText.x < -2000) this.creditsText.x = config.width;
  }
}