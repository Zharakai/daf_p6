class Player {
    constructor(name, weapon, picture, health, shield, position) {
        this.name = name;
        this.weapon = weapon;
        this.picture = picture;
        this.health = health;
        this.shield = shield
        this.position = position;
    }

    // displayPlayerCard() {}

    // getAllDamages() {}
}

const iop = new Player("Iop", corbalame, "./sprites/iop.png", 100, 0, "");
const steamer = new Player("Steamer", corbalame, "./sprites/steamer.png", 100, 0, "");

const players = [iop, steamer];

//let playerPosition = [];
let availableCellsAroundPlayerOne = [];
let tdAvailableAroundPlayerOne = [];

/*
console.log(players);
console.log(availableCellsAroundPlayerOne);
console.log(tdAvailableAroundPlayerOne);
*/