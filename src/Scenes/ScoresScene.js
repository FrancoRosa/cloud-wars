import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
import scores from '../js/topscores';
import dom from '../js/dom';
import scoresAPI from '../js/scoresAPI';

export default class ScoresScene extends Phaser.Scene {
  constructor() {
    super('Scores');
  }

  preload() {
    dom.hide();
    dom.loader();
    this.add.image(250, 100, 'logo');
  }

  create() {
    this.menuButton = new Button(this, config.midx, config.midy + 170, 'Menu', 'Title');
    this.add.text(160, 200, 'Top 5 High Scores', { fontSize: '16px', fill: '#FFF' });

    scoresAPI.gettop()
      .then(() => {
        dom.hide();
        let tab = 0;
        scores.topscores.forEach(element => {
          this.add.text(160, 260 + tab, `${tab / 24 + 1}.- ${element.user}: ${element.score}`, { fontSize: '16px', fill: '#FFF' });
          tab += 24;
        });
      })
      .catch(e => this.add.text(16, 300, e, { fontSize: '16px', fill: '#FFF' }));
  }
}
