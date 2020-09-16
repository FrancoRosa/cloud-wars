import Phaser from 'phaser';
import scores from '../js/topscores';
import config from '../Config/config';
import Button from '../Objects/Button';
import scoresAPI from '../js/scoresAPI';
import dom from '../js/dom';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  preload() {
    this.add.image(250, 200, 'logo');
  }

  create() {
    this.sfx = {
      life: this.sound.add('sndLife'),
    };

    this.menuButton = new Button(this, config.midx, config.midy + 170, 'Menu', 'Title');
    this.userNameText = this.add.text(210, 310, `${scores.user.user}`, { fontSize: '16px', fill: '#FFF' });
    this.finalScoreText = this.add.text(210, 330, `score: ${scores.user.score}`, { fontSize: '16px', fill: '#FFF' });
    dom.loader();
    scoresAPI.gettop()
      .then(() => {
        dom.hide();
        if (scores.user.score > scores.topscores[4].score) {
          this.add.text(100, 390, 'You entered the hall of fame!', { fontSize: '16px', fill: '#FFF' });
          this.sfx.life.play();
          scoresAPI.save();
        } else {
          this.add.text(90, 390, 'Low scores don\'t deserve to be saved.', { fontSize: '16px', fill: '#FFF' });
          this.sfx.life.play();
        }
      });
  }
}