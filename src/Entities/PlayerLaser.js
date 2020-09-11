import Entity from './Entity';

export default class PlayerLaser extends Entity {
  constructor(scene, x, y, speed) {
    super(scene, x, y, 'sprLaserPlayer');
    if (speed < 0) this.body.velocity.y = -250 + speed;
    else this.body.velocity.y = -250;
  }
}
