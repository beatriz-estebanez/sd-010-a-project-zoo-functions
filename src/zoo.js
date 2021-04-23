/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const data = require('./data');

const { animals, employees, prices } = data;

function animalsByIds(...ids) {
  const someAnimals = animals.filter((animalId) => ids.includes(animalId.id));
  return someAnimals;
}

function animalsOlderThan(animal, age) {
  const animalSpecies = animals.find((species) => species.name === animal);
  return animalSpecies.residents.every((animalAge) => animalAge.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return { };
  const employNames = employees
    .find((name) => name.firstName === employeeName || name.lastName === employeeName);
  return employNames;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((person) => person.managers.includes(id));
}

function addEmployee(id, firstName, lastName, [...managers] = [], [...responsibleFor] = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  // if (species === undefined) {
  //   const animalData = {};
  //   animals.forEach((animal) => {
  //     animalData[animal.name] = animal.residents.length;
  //   });
  // }
  const animalData = animals.reduce((acc, animal) => {
    acc[animal.name] = animal.residents.length;
    return acc;
  }, {});
  if (species === undefined) {
    return animalData;
  }
  return animalData[species];
}

function entryCalculator(entrants = 0) {
  // referência do código do Andy
  const totalValue = Object.keys(entrants);
  return totalValue.reduce((acc, actual) => acc + entrants[actual] * prices[actual], 0);
}

// function animalMap(options) {
//   // seu código aqui
// }

// function schedule(dayName) {
//   // seu código aqui
// }

// function oldestFromFirstSpecies(id) {
//   // seu código aqui
// }

// function increasePrices(percentage) {
//   // seu código aqui
// }

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

module.exports = {
  entryCalculator,
  // schedule,
  animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
