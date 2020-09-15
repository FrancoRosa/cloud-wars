import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
import scores from '../js/topscores';
import { hide, loader } from '../js/dom';
import { getScore } from '../js/savescores';

export default class ScoresScene extends Phaser.Scene {
  constructor() {
    super('Scores');
  }

  preload() {
    hide();
    loader();
    this.add.image(250, 100, 'logo');
  }

  create() {
    this.menuButton = new Button(this, config.midx, config.midy + 170, 'Menu', 'Title');
    getScore()
      .then(() => {
        hide();
        let tab = 0;
        scores.topscores.forEach(element => {
          this.add.text(200, 260 + tab, `${element.user}: ${element.score}`, { fontSize: '16px', fill: '#FFF' });
          tab += 24;
        });
      })
      .catch(e => this.add.text(16, 300, e, { fontSize: '16px', fill: '#FFF' }));
  }
}
