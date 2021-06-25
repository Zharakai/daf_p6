class Player {
    constructor(name, weapon, picture, health, shield, position) {
        this.name = name;
        this.weapon = weapon;
        this.picture = picture;
        this.health = health;
        this.shield = shield
        this.position = position;
    }

    displayPlayerCard(player) {
        let playerCard = `
            <div class="playerCard">
                <p>${player.name}</p>
                <p>Points de vie : ${player.health}</p>
                <p>Points d'attaque : ${player.weapon.damage}</p>
                <p>Bouclier : ${player.shield}</p>
            </div>
        `;

        players.forEach((player) => {
            //console.log(playerCard);
            console.log(player);
        });

        console.log(playerCard);
    }

    static setWeapon(weapon) {
        //console.log("setWeapon : ", weapon);
        currentPlayer.weapon = weapon;
      }
    // getAllDamages() {}
}

const iop = new Player("Iop", corbalame, "./sprites/iop.png", 100, 0, "");
const steamer = new Player("Steamer", corbalame, "./sprites/steamer.png", 100, 0, "");

const players = [iop, steamer];

//let playerPosition = [];
let availableCellsAroundPlayerOne = [];
let tdAvailableAroundPlayerOne = [];

//console.log(players);
