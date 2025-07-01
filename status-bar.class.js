// Gesundheitsbalken - zeigt nur Zahlen
class StatusBar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 0;
        this.width = 0; // Balken ausblenden
        this.height = 0; // Balken ausblenden
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let Path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[Path];
    }

    draw(ctx) {
        // Zeichne nur Text statt Balken
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        
        let healthText = `Health: ${this.percentage}`;
        ctx.strokeText(healthText, this.x, this.y + 25);
        ctx.fillText(healthText, this.x, this.y + 25);
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}

// Münzen-Zähler
class StatusBarCoin extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    coins = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 50;
        this.width = 0; // Balken ausblenden
        this.height = 0; // Balken ausblenden
        this.setPercentage(0);
    }

    setPercentage(coins) {
        this.coins = Math.floor(coins / 10); // Zeige Münzenzahl nicht Prozent
    }

    draw(ctx) {
        // Zeichne nur Text statt Balken
        ctx.font = "20px Arial";
        ctx.fillStyle = "gold";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        
        let coinText = `Coins: ${this.coins}`;
        ctx.strokeText(coinText, this.x, this.y + 25);
        ctx.fillText(coinText, this.x, this.y + 25);
    }

    resolveImageIndex() {
        if (this.coins == 0) {
            return 0;
        } else if (this.coins > 8) {
            return 5;
        } else if (this.coins > 6) {
            return 4;
        } else if (this.coins > 4) {
            return 3;
        } else if (this.coins > 2) {
            return 2;
        } else {
            return 1;
        }
    }
}

// Flaschen-Zähler
class Bottlebar extends DrawableObject {
    IMAGES = [
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png"
    ];

    bottles = 0;

    constructor(initialBottles = 0) {
        super();
        this.bottles = initialBottles;
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 100;
        this.width = 0; // Balken ausblenden
        this.height = 0; // Balken ausblenden
        this.setPercentage(initialBottles);
    }

    setPercentage(bottles) {
        this.bottles = Math.floor(bottles / 20); // Zeige Flaschenzahl nicht Prozent
    }

    draw(ctx) {
        // Zeichne nur Text statt Balken
        ctx.font = "20px Arial";
        ctx.fillStyle = "brown";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        
        let bottleText = `Bottles: ${this.bottles}`;
        ctx.strokeText(bottleText, this.x, this.y + 25);
        ctx.fillText(bottleText, this.x, this.y + 25);
    }

    resolveImageIndex() {
        if (this.bottles >= 5) {
            return 5;
        } else if (this.bottles > 4) {
            return 4;
        } else if (this.bottles > 3) {
            return 3;
        } else if (this.bottles > 2) {
            return 2;
        } else if (this.bottles >= 1) {
            return 1;
        } else {
            return 0;
        }
    }
}