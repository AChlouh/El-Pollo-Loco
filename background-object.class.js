// Diese Klasse repräsentiert ein Hintergrundobjekt (z.B. Landschaft, Himmel) im Spiel.
// Sie erbt von MovableObject, damit sie auf dem Spielfeld verschoben werden kann.
class BackgroundObject extends MovableObject {
    // Die Breite und Höhe des Hintergrundobjekts (passend zur Canvas-Größe)
    width = 750;
    height = 480;

    /**
     * Erzeugt ein neues Hintergrundobjekt.
     * @param {string} imagePath - Pfad zum Bild des Hintergrunds
     * @param {number} x - X-Position des Hintergrundobjekts
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath); // Bild laden
        this.x = x;                   // X-Position setzen
        this.y = 480 - this.height;   // Y-Position so setzen, dass das Objekt am unteren Rand des Canvas steht
    }
}