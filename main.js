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
    return result;
  }
}

const robin = new Character("Robin");
robin.inventory = ["sword", "potion", "artifact"];
robin.companion = new Character("Leo");
robin.companion.type = "Cat";
robin.companion.companion = new Character("Frank");
robin.companion.companion.type = "Flea";
robin.companion.companion.inventory = ["small hat", "sunglasses"];


for (const belonging of robin.inventory) {
  console.log(`${robin.name}'s belonging: ${belonging}`);
}

for (const belonging of robin.companion.companion.inventory) {
  console.log(`${robin.companion.companion.name}'s belonging: ${belonging}`);
}

// Part 2

console.log(robin);

// Part 3 / Part 4 / Part 6

class Adventurer extends Character {
  static ROLES = ["Fighter", "Cleric", "Wizard", "Rogue", "Druid", "Bard", "Warlock", "Paladin", "Monk", "Sorcerer", "Ranger", "Barbarian"];
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

class Tiefling extends Adventurer {
  static SUBRACES = ["Asmodeus", "Mephistopheles", "Zariel"];

  constructor(name, role, subrace) {
    super(name, role, "Tiefling");

    if (!Tiefling.SUBRACES.includes(subrace)) {
      throw new Error(`Invalid subrace: ${subrace}. Choose from: ${Tiefling.SUBRACES.join(", ")}`);
    }

    this.subrace = subrace;
    this.darkvision = true;
    this.hellishResistance = "Fire";
  }

  darkvisionAbility() {
    console.log(`${this.name} uses Darkvision. They can see in the dark up to 40 ft.`);
  }

  hellishResistance(damage) {
    const reducedDamage = damage / 2;
    this.health -= reducedDamage;
    console.log(`${this.name} uses Hellish Resistance. They take only ${reducedDamage} fire damage instead of ${damage}.`);
  }
  duel(opponent) {
    console.log(`${this.name}, the Tiefling, challenges ${opponent.name} to a duel.`);
    super.duel(opponent);
  }
}

const karlach = new Tiefling("Karlach", "Barbarian", "Zariel");
karlach.duel(robin);

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
  constructor(role, race) {
    if (!Adventurer.ROLES.includes(role)) {
      throw new Error(`Invalid role: ${role}. You gotta pick one of these bro: ${Adventurer.ROLES.join(", ")}`);
    }

    if (!Adventurer.RACE.includes(race)) {
      throw new Error(`Invalid race: ${race}. Here are the races available ${Adventurer.RACE.join(", ")}`);
    }

    this.role = role;
    this.race = race;
    this.adventurers = [];
  }

  generate(name) {
    const newAdventurer = new Adventurer(name, this.role, this.race);
    this.adventurers.push(newAdventurer);
    return newAdventurer;
  }

  findByIndex(index) {
    return this.adventurers[index];
  }

  findByName(name) {
    return this.adventurers.find((a) => a.name === name);
  }
}

const clerics = new AdventurerFactory("Cleric", "Human");
const shadowheart = clerics.generate("Shadowheart");
const deebee = clerics.generate("Deebee");

console.log(`\nReturns the first cleric:\n`, clerics.findByIndex(0));
console.log(`\nFinds deebee by name:\n`, clerics.findByName("Deebee"));
console.log(`\nAll clerics:\n`, clerics);
