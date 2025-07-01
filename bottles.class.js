/**
 * Diese Klasse repräsentiert eine sammelbare Flasche (Bottle) im Spiel.
 * Sie erbt von MovableObject und wird zufällig auf der Karte platziert.
 * Die Flaschen können vom Spieler eingesammelt und geworfen werden.
 */
class Bottle extends MovableObject {
   
    height = 80;
    width = 60;
    offset = {
        top: 40,
        left: 40,
        right: 40,
        bottom: 40
    };

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * Erstellt eine neue Flasche an einer zufälligen Position.
     */
    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 200 + Math.random() * 1800;    // zufällige x-Position
        this.y = 180 + Math.random() * 100;     // y-Position jetzt zwischen 180 und 280 (Laufbereich)
        console.log('Bottle position:', this.x, this.y); // Logging für Debug
        this.animate();
    }
    
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 500);
    }
}