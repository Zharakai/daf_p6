class Player {
    constructor(name, weapon, picture, health, shield, position) {
        this.name = name;
        this.weapon = weapon;
        this.picture = picture;
        this.health = health;
        this.shield = shield
        this.position = position;
    }

    static setWeapon(weapon) {
        currentPlayer.weapon = weapon;
      }
}

const iop = new Player("Iop", corbalame, "./sprites/iop.png", 100, 0, "");
const steamer = new Player("Steamer", corbalame, "./sprites/steamer.png", 100, 0, "");

const players = [iop, steamer];
