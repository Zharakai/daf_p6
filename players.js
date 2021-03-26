class Player {
    constructor(name, weapon, picture, health, position) {
        this.name = name;
        this.weapon = weapon;
        this.picture = picture;
        this.health = health;
        this.position = position;
    }
}

const iop = new Player("Iop", goultard, "./sprites/iop.png", 100, "");
const steamer = new Player("Steamer", raziel, "./sprites/steamer.png", 100, "");

const players = [iop, steamer];
//console.log(players)