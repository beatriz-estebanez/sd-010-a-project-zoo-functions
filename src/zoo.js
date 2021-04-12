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

// const { animals } = require('./data');
// const { employees } = require('./data');
// const { animals } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return data.animals.filter((animal, index) => animal.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  return data.animals
    .find((arrayAnimal) => arrayAnimal.name === animal).residents
    .every((objAnimal) => objAnimal.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return data.employees.some(({ managers }, index) => managers[index] === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (!species) {
    return data.animals.reduce((acc, animal) => {
      acc[animal.name] = animal.residents.length;
      return acc;
    }, {});
  }
  return data.animals.find((animal) => animal.name === species).residents.length;
}
// console.log(animalCount());

//   if (species === undefined) {
//     const animalList = data.animals.reduce((acc, animal) => {
//       Object.assign({}, animal.name, animal.popularity);
//       const animals = animal.name;
//       const quantAnimals = animal.popularity;
//       return acc + { [animals] : quantAnimals };
//       }, {});
//     return animalList;
//   }

// data.animals.map((animal) => {
//   const animals = animal.name;
//   const quantAnimals = animal.popularity;
//   return {[animals] : quantAnimals };
// });

// data.animals.reduce((acc, animal) => {
//   console.log(animal.name, animal.popularity);
//   const propertyAnimal = {[animal.name] : animal.popularity};
//   return acc + propertyAnimal;
// }, {});

function entryCalculator(entrants) {
  if (!entrants) return 0;

  const visitants = Object.entries(entrants);

  if (!visitants.length) return 0;

  return visitants
    .map(([ageRange, quant]) => quant * data.prices[ageRange])
    .reduce((acc, value) => acc + value);
}

// function animalMap(options) {
//   // seu código aqui
// }
// const openingHours = (open, close) => {
//   const daysOfTheWeek = Object.keys(data.hours);
//   const openingHours = Object.values(data.hours);
//   return open = 'aberto'

// };

// const dayParametro = (dayName) => {
//   const hour = Object.entries(data.hours);
//   const objDay = {};
//   hour.forEach(([day, { open, close }]) => {
//     if (dayName === day) objDay[dayName] = 'CLOSED';
//     objDay[dayName] = `Open from ${open}am until ${close - 12}pm`;
//   });
//   return objDay;
// };

// function schedule(dayName) {
//   const hour = Object.entries(data.hours);
//   const objDays = {};
//   hour.forEach(([day, { open, close }]) => {
//     if (open !== close) objDays[day] = `Open from ${open}am until ${close - 12}pm`;
//     if (open === close) objDays[day] = 'CLOSED';
//   });
//   if (!dayName) return objDays;
//   return dayParametro(dayName);
// }
// console.log(schedule('Monday'));

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
