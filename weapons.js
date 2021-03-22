class Weapon {
    constructor(name, type, damage, picture) {
        this.name = name;
        this.type = type;
        this.damage = damage;
        this.picture = picture;
    }
}

const goultard = new Weapon("goultard", "sword", 25, "./sprites/goultard.png");
const raziel = new Weapon("raziel", "sword", 20, "./sprites/raziel.png");

const weapons = [goultard, raziel];
//console.log(weapons);