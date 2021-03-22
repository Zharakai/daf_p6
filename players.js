class Player {
    constructor(name, weapon, picture, health) {
        this.name = name;
        this.weapon = weapon;
        this.picture = picture;
        this.health = health;
    }
}

const iop = new Player("Iop", "", "./sprites/iop.png", 100);
const steamer = new Player("Steamer", "", "./sprites/steamer.png", 100);

const players = [iop, steamer];
console.log(players)