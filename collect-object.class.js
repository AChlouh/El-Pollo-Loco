/**
 * Diese Klasse repräsentiert ein sammelbares Coin-Objekt im Spiel.
 * Sie erbt von MovableObject und wird zufällig auf der Karte platziert.
 */
class Coins extends MovableObject {
  /**
   * Höhe des Coins
   * @type {number}
   */
  height = 130;
  /**
   * Breite des Coins
   * @type {number}
   */
  width = 130;
  /**
   * Offset für die Kollisionsprüfung
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = {
    top: 43,
    right: 43,
    bottom: 43,
    left: 43,
  };
  /**
   * Bildpfade für die Coin-Animation
   * @type {string[]}
   */
  IMAGES_COIN = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'];

  /**
   * Erstellt ein neues Coin-Objekt an zufälliger Position und startet die Animation.
   */
  constructor() {
    super().loadImage('img/8_coin/coin_1.png');
    this.loadImages(this.IMAGES_COIN);
    this.randomPositioningCoins();
    this.animateCoins();
  }
  /**
   * Generiert eine zufällige Position für das Coin-Objekt.
   */
  randomPositioningCoins() {
    this.x = 500 + Math.random() * 1600;
    this.y = 50 + Math.random() * 180;
  }
  /**
   * Startet die Animation des Coins (Bildwechsel).
   */
  animateCoins() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, 500);
  }
}

class Bottles extends MovableObject {
  height = 90;
  width = 90;
  offset = {
    top: 43,
    right: 43,
    bottom: 43,
    left: 43,
  };

  IMAGES_BOTTLES = [
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
  ];

  /**
   * Initializes a new instance of the class.
   * This constructor calls the `loadImage` method of the parent class with the image path `'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'`.
   * It then calls the `loadImages` method with the `IMAGES_BOTTLES` array.
   * After that, it calls the `randomPositioningBottle` method to generate a random position for the bottle.
   * Finally, it calls the `animateBottle` method to start the bottle animation.
   * @return {void} This constructor does not return a value.
   */
  constructor() {
    super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    this.loadImages(this.IMAGES_BOTTLES);
    this.randomPositioningBottle();
    this.animateBottle();
  }

  /**
   * Sets random x and y positions for the bottle object.
   * @return {void} This function does not return a value.
   */
  randomPositioningBottle() {
    this.x = 500 + Math.random() * 1600;
    this.y = 60 + Math.random() * 180;
  }

  /**
   * Animate the bottle by playing the animation using the images from the `IMAGES_BOTTLES` array.
   * This function sets an interval to repeatedly play the animation every 500 milliseconds.
   * @return {void} This function does not return a value.
   */
  animateBottle() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLES);
    }, 500);
  }
}