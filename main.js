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

class Character {
  static MAX_HEALTH = 100;

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

// Part 3 / Part 4 / Part 6

// Create an additional method, duel(), for the Adventurer class with the following functionality:
// Accept an Adventurer as a parameter.
// Use the roll() functionality to create opposing rolls for each adventurer.
// Subtract 1 from the adventurer with the lower roll.
// Log the results of this “round” of the duel, including the rolls and current health values.
// Repeat this process until one of the two adventurers reaches 50 health.
// Log the winner of the duel: the adventurer still above 50 health.

class Adventurer extends Character {
  static ROLES = ["Fighter", "Cleric", "Wizard", "Rogue", "Druid", "Bard", "Warlock", "Paladin", "Monk", "Sorcerer", "Ranger"];
  static RACE = ["Human", "Elf", "Dwarf", "Drow", "Half-Elf", "Half-Orc", "Dragonborn", "Tiefling"];
  static ACTION_POINTS = 1;
  
  constructor(name, role, race) {
    super(name);
    this.role = role;
    this.race = race;
    this.inventory.push("bedroll", "50 gold coins");

    if (!Adventurer.ROLES.includes(role)) {
      throw new Error(`Invalid role: ${role}. You gotta pick one of these bro: ${Adventurer.ROLES.join(", ")}`);
    }

    if (!Adventurer.RACE.includes(race)) {
      throw new Error(`Invalid race: ${race}. Here are the races available ${Adventurer.RACE.join(", ")}`);
    }
  }

  duel(opponent) {
    while (this.health > 50 && opponent.health > 50) {
      const adventurerRoll = this.roll();
      const opponentRoll = opponent.roll();
      let loser = adventurerRoll < opponentRoll ? this : opponent;
      loser.health--;
      console.log(`Round result:\n${this.name} rolls ${adventurerRoll}.\n${opponent.name} rolls ${opponentRoll}.\nSo ${loser.name} loses 1 health. That's tough.`);
    }
    const winner = this.health > 50 ? this : opponent;
    console.log(`${winner.name} wins the duel with ${winner.health} health remaining. But they probably cheated.`);
  }

  scout() {
    console.log(`${this.name} is scouting ahead...`);
    super.roll();
  }
}

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

const adventurerRobin = new Adventurer("Robin", "Bard", "Half-Elf");

adventurerRobin.companion = leo;

adventurerRobin.scout();

// Part 5 - Constructor factory

class AdventurerFactory {  
  constructor (role) {
    this.role = role;
    this.adventurers = [];
  }
  generate (name) {
    const newAdventurer = new Adventurer(name, this.role);
    this.adventurers.push(newAdventurer);
  }
  findByIndex (index) {
    return this.adventurers[index];
  }
  findByName (name) {
    return this.adventurers.find((a) => a.name === name);
  }
}

const healers = new AdventurerFactory("Healer");
const robin = healers.generate("Robin");
