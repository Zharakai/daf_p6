class Weapon {
    constructor(name, type, damage, picture) {
        this.name = name;
        this.type = type;
        this.damage = damage;
        this.picture = picture;
    }
}

const goultard = new Weapon("Goultard", "sword", 25, "./sprites/goultard.png");
const raziel = new Weapon("Raziel", "sword", 20, "./sprites/raziel.png");
const sabre = new Weapon("Sabre", "saber", 15, "./sprites/epee_rouge.png");
const corbalame = new Weapon("Corbalame", "sword", 10, "./sprites/epee_blanche.png");

const weapons = [goultard, raziel, sabre, corbalame];
