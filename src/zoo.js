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

const { animals } = require('./data');
const { employees } = require('./data');
// const data = require('./data');

function animalsByIds(...ids) {
  const result = [];
  if (ids !== undefined) {
    ids.forEach((id) => {
      result.push(...animals.filter((element) => element.id === id).map((element) => element));
      return result;
    });
  }
  return result;
}
function animalsOlderThan(animal, age) {
  let output = animals
    .filter((element) => element.name === animal)
    .map((element) => element.residents);
  output = output.shift().map((element) => element.age > age);
  return output.every((element) => element === true);
}
function employeeByName(employeeName) {
  const name = employeeName.split(' ');
  let output;
  for (let index = 0; index < name.length; index += 1) {
    output = employees
      .filter((element) => (element.firstName || element.lastName) === name[index]);
  }
  return output;
}
// function createEmployee(personalInfo, associatedWith) {
//   // seu código aqui
// }

// function isManager(id) {
//   // seu código aqui
// }

// function addEmployee(id, firstName, lastName, managers, responsibleFor) {
//   // seu código aqui
// }

// function animalCount(species) {
//   // seu código aqui
// }

// function entryCalculator(entrants) {
//   // seu código aqui
// }

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
  // entryCalculator,
  // schedule,
  // animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  // addEmployee,
  // isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  // createEmployee,
};
