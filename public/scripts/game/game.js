// Source: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './config.js';
import Map from './map.js';
import Hero from './hero.js';

// Globals
let map;
let hero;

function init() {
  const CONTEXT = document.getElementById('game').getContext('2d');
  CONTEXT.imageSmoothingEnabled = false; // Disable image smoothing

  map = new Map();
  window.hero = hero = new Hero();

  hero.setPosition(7, 17); // Start position
}

function draw() {
  const CONTEXT = document.getElementById('game').getContext('2d');

  CONTEXT.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Clear canvas

  // Draw background
  CONTEXT.drawImage(map.image, ...map.position);

  // Draw hero
  hero.update();
  CONTEXT.drawImage(hero.image, ...hero._position, ...hero.size, ...hero.position, ...hero.size);

  window.requestAnimationFrame(draw);
}

(async () => {
  init();
  window.requestAnimationFrame(draw);
})();
