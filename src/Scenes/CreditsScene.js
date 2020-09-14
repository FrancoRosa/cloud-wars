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
    this.menuButton = new Button(this, config.midx, config.midy + 170, 'blueButton1', 'blueButton2', 'Menu', 'Title');

    this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
    this.madeByText = this.add.text(0, 0, 'Created by: FrancoRosa', { fontSize: '26px', fill: '#fff' });
    this.inspiredByText = this.add.text(0, 0, 'Inspired by: Jared York', { fontSize: '26px', fill: '#fff' });
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);

    Phaser.Display.Align.In.Center(this.creditsText, this.zone);
    Phaser.Display.Align.In.Center(this.madeByText, this.zone);
    Phaser.Display.Align.In.Center(this.inspiredByText, this.zone);

    this.madeByText.setY(1000);
    this.inspiredByText.setY(2000);

    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete: () => this.destroy,
    });

    this.madeByTween = this.tweens.add({
      targets: [this.madeByText, this.inspiredByText],
      y: -300,
      ease: 'Power1',
      duration: 8000,
      delay: 1000,
      onComplete: () => {
        // eslint-disable-next-line no-unused-expressions
        this.madeByTween.destroy;
        this.scene.start('Title');
      },
    });
  }
}