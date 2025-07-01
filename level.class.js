class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottlebar;
    bottles;
    coins;
    level_end_x = 2200;

    constructor(enemies, clouds, coins, bottles, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.bottles = bottles;
        this.backgroundObjects = backgroundObjects
    }
}