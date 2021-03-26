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
const arme3 = new Weapon("arme3", "sword", 15, "./sprites/raziel.png");
const arme4 = new Weapon("arme4", "sword", 10, "./sprites/raziel.png");

const weapons = [goultard, raziel, arme3, arme4];
//console.log(weapons);