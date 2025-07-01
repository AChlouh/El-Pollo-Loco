let level1;

function initLevel() {
    level1 = new Level(
        // Enemies (erste Parameter)
        [
            new LittleChicken(),
            new LittleChicken(),
            new LittleChicken(),
            new LittleChicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Endboss()
        ],
        // Clouds (zweite Parameter)
        [
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud()
        ],
        // Coins (dritte Parameter)
        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin()
        ],
        // Bottles (vierte Parameter)
        [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
        ],
        // Background Objects (fünfte Parameter)
        [
            new BackgroundObject('img/5_background/layers/air.png', -749),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -749),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -749),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -749),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

            new BackgroundObject('img/5_background/layers/air.png', 749),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 749),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 749),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 749),

            new BackgroundObject('img/5_background/layers/air.png', 749 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 749 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 749 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 749 * 2),

            new BackgroundObject('img/5_background/layers/air.png', 749 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 749 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 749 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 749 * 3),
        ]
    );
}