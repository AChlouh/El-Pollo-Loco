class Coin extends MovableObject {

    height = 120;
    width = 120;

    offset = {      //Offset zur genauen Kollisionsprüfung (Offset wird von der ursprünglichen Bildgröße abgezogen!)
        top: 40,
        left: 40,
        right: 40,
        bottom: 40
    };

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];


    constructor() {
        super().loadImage('img/8_coin/coin_2.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = 200 + Math.random() * 1800;    //zufällige x-Pos. zwischen 200 und 2000
        this.y = 120 + Math.random() * 180;    //zufällige y-Pos. zwischen 200 und 2000
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 500);
    }
}

