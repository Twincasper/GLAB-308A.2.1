// Part 1

const adventurer = {
  name: "Robin",
  health: 10,
  inventory: ["sword", "potion", "artifact"],
  companion: {
    name: "Leo",
    type: "Cat",
    companion: {
      name: "Frank",
      type: "Flea",
      belongings: ["small hat", "sunglasses"]
    }
  },
  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
    console.log(`${this.name} rolled a ${result}.`);
  }
};

adventurer.roll();
adventurer.roll(2);

// Part 2

class Character {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.inventory = [];
  }

  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
    console.log(`${this.name} rolled a ${result}.`);
  }
}

const robin = new Character("Robin");
robin.inventory = ["sword", "potion", "artifact"];
robin.companion = new Character("Leo");
robin.companion.type = "Cat";
robin.companion.companion = new Character("Frank");
robin.companion.companion.type = "Flea";
robin.companion.companion.inventory = ["small hat", "sunglasses"];

console.log(robin);

// Part 3

class Adventurer extends Character {
  constructor (name, role) {
    super(name);
    // Adventurers have specialized roles.
    this.role = role;
    // Every adventurer starts with a bed and 50 gold coins.
    this.inventory.push("bedroll", "50 gold coins");
  }
  // Adventurers have the ability to scout ahead of them.
  scout () {
    console.log(`${this.name} is scouting ahead...`);
    super.roll();
  }
}

/*
Next, create a Companion class with properties and methods specific to the companions.
Finally, change the declaration of Robin and the companions to use the new Adventurer and Companion classes.
*/

class Companion extends Character {
  constructor (name, type) {
    super(name);
    this.type = type;
    this.belongings = [];
  }
  help () {
    console.log(`${this.name} is helping ${this.adventurer.name}...`);
    super.roll();
  }
}

const leo = new Companion("Leo", "Cat");

const adventurerRobin = new Adventurer("Robin", "Bard");

adventurerRobin.companion = leo;

adventurerRobin.scout();