class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;
    speed = 0.15;


    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        // bei reload zufällige positionierung der Wolken
        this.x = Math.random() * 2800;
        this.animate();
    }

    // function für die Animation der Wolken 
    animate() {
        this.moveLeft();
    }

    
}