/**
 * Basisklasse für alle Objekte, die auf dem Canvas gezeichnet werden können.
 * Stellt Methoden zum Laden und Zeichnen von Bildern bereit.
 */
class DrawableObject {
    /**
     * Das aktuell angezeigte Bild
     * @type {HTMLImageElement}
     */
    img;
    /**
     * Bild-Cache für Animationen
     * @type {Object}
     */
    imageCache = {};
    /**
     * Index des aktuellen Bildes (für Animationen)
     * @type {number}
     */
    currentImage = 0;
    /**
     * X-Position des Objekts
     * @type {number}
     */
    x = 120;
    /**
     * Y-Position des Objekts
     * @type {number}
     */
    y = 280;
    /**
     * Höhe des Objekts
     * @type {number}
     */
    height = 150;
    /**
     * Breite des Objekts
     * @type {number}
     */
    width = 100;

    /**
     * Lädt ein Bild und speichert es in img.
     * @param {string} path - Pfad zum Bild
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
    /**
     * Zeichnet das Objekt auf das Canvas.
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

    }
    /**
     * Zeichnet einen Rahmen um das Objekt (z.B. für Debugzwecke).
     * @param {CanvasRenderingContext2D} ctx
     */
    drawFrame(ctx) {
        // das die Quadratische anzeige nur auf Character , Chicken und Endboss angezeigt werden
        if (this instanceof Character || this instanceof Chicken || this instanceof LittleChicken || this instanceof Endboss || this instanceof Bottle  || this instanceof Coin) {

            // Die Quardratische Anzeige für die weitere bearbeitung der Qualition.
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'transparent';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
    /**
     * Lädt mehrere Bilder in den Cache.
     * @param {Array<string>} arr - Array mit Bildpfaden
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

}
