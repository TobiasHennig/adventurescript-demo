export default class Map {
  constructor() {
    this.name = 'map';
    this.image = new Image;
    this.image.src = '/assets/map.png';
    this.position = [0, 0];
  }
}
