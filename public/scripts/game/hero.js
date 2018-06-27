import { SPEED } from './config.js';
import { u } from './helpers.js';

function waitUntil(condition) {
  return new Promise(resolve => {
    function run() {
      if (condition()) {
        window.cancelAnimationFrame(identifier);
        return resolve();
      }
      window.requestAnimationFrame(run);
    }
    const identifier = window.requestAnimationFrame(run);
  });
}

export default class Hero {
  constructor() {
    this._direction = 0;
    this._moving = false;
    this._name = 'hero';
    this._position = [0, 0]; // sx, sy
    this._speed = 1;
    this._target = [0, 0];

    this.image = new Image;
    this.position = [0, 0]; // dx, dy
    this.size = [u(1), u(1)]; // sWidth, sHeight / dWidth, dHeight

    this.image.src = '/assets/hero.png';
  }
  setPosition(x, y) {
    this._target = [u(x), u(y)];
    this.position = [u(x), u(y)];
  }
  move(steps) {
    this._moving = true;
    switch (this._direction) {
      case 0:
        this._target[1] -= u(steps); // top
        break;
      case 1:
        this._target[0] += u(steps); // right
        break;
      case 2:
        this._target[1] += u(steps); // bottom
        break;
      case 3:
        this._target[0] -= u(steps); // left
        break;
      default:
        throw new Error('Unknown direction');
        break;
    }
    return waitUntil(() => !this._moving);
  }
  look(direction) {
    // 0 = top, 1 = right, 2 = bottom, 3 = left
    this._direction = direction;
    if (direction === 0 || direction === 2) {
      this._position = [0, 0];
    } else {
      this._position = [0, u(1)];
    }
    return Promise.resolve();
  }
  jump() {
    return this.move(2);
  }
  hit() {
    return Promise.resolve();
  }
  dig() {
    return Promise.resolve();
  }
  update() {
    // console.log(this._moving, this.position, this._target);
    if (this.position[0] < this._target[0]) {
      this.position[0] += SPEED;
    }
    if (this.position[0] > this._target[0]) {
      this.position[0] -= SPEED;
    }
    if (this.position[1] < this._target[1]) {
      this.position[1] += SPEED;
    }
    if (this.position[1] > this._target[1]) {
      this.position[1] -= SPEED;
    }
    if (this._moving && this.position[0] === this._target[0] && this.position[1] === this._target[1]) {
      this._moving = false;
    }
  }
}
