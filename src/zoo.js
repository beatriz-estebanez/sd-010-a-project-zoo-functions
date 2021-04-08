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

function animalsByIds(...ids) {
  const answer = [];
  data.animals.forEach((animal) => {
    ids.forEach((id) => {
      if (id === animal.id) {
        answer.push(animal);
      }
    });
  });
  return answer;
}

function animalsOlderThan(animal, age) {
  const specificAnimal = data.animals.filter((curr) => curr.name === animal);
  const ageTest = specificAnimal[0].residents.every((individual) => individual.age > age);
  return ageTest;
}

function employeeByName(employeeName) {
  const arr = data.employees.filter((person) => person.firstName === employeeName
  || person.lastName === employeeName);
  let obj = arr[0];
  if (typeof obj === 'undefined') {
    obj = {};
  }
  return obj;
}
console.log(employeeByName());

/*
function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
*/
module.exports = {
  animalsByIds,
  animalsOlderThan,
  employeeByName,
};
