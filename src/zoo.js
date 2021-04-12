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
  // if (ids.length === 0) return [];
  // if (ids.length === 1) {
  //  return data.animals.find(({id}) => id === ids[0])
  // }
  return data.animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animal, age) {
  const bichos = data.animals.find((bicho) => bicho.name === animal);
  return bichos.residents.every((idd) => idd.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  // return data.employees.find(({ firstName, lastName }) => firstName === employeeName
  // || lastName === employeeName);
  return data.employees.find(({ firstName, lastName }) => firstName === employeeName
    || lastName === employeeName);
  // function employeeByName(employeeName) {
  //     if (employeeName === undefined) {
  // return {}; } if (data.employees.firstName === employeeName) {
  //       return data.employees.find(({ firstName, lastName }) =>
  // firstName === employeeName || lastName === employeeName); } }
  //   function createEmployee(personalInfo, associatedWith) {
  //     const { id, firstName, lastName } = personalInfo;
  //     const { managers, responsibleFor } = associatedWith;
  //     const employee = { id,firstName, lastName, managers,
  //       responsibleFor,
  //     };
  //     return employee;
  //   }
}

function createEmployee(personalInfo, associatedWith) {
  // responsibleFor = []) {
  //   // const { id, firstName, lastName } = personalInfo;
  //   // const { managers, responsibleFor } = associatedWith;
  //   const employee = {
  //     id,
  //     firstName, lastName, managers, responsibleFor,//   };
  //   data.employees.push(employee);

  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employee;
}

function isManager(id) {
  return data.employees.some((item) => item.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(employee);
}

function animalCount(species) {
  if (species === undefined) {
    return data.animals.reduce((acc, currentAnimal) => {
      acc[currentAnimal.name] = currentAnimal.residents.length;
      return acc;
    }, {});
  }
  return data.animals.find(({ name }) => name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined) return 0;
  if (Object.values(entrants).length === 0) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  console.log(entrants.prices);
  return ((data.prices.Adult * Adult) + (data.prices.Senior * Senior) 
  + (data.prices.Child * Child));
}
entryCalculator();
// const pessoas = {
//   Adult: 49.99,
//   Senior: 24.99,
//   Child: 20.99,
// };

// entryCalculator(pessoas);
// prices: {
//   Adult: 49.99,
//   Senior: 24.99,
//   Child: 20.99,
// },

// function animalMap(options) {
//   // seu código aqui
// }

// function schedule(dayName) {
// const days = Object.keys(hours);
//   data.hours.keys
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
  //   schedule,
  animalCount,
  //   animalMap,
  animalsByIds,
  employeeByName,
  //   employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  //   oldestFromFirstSpecies,
  //   increasePrices,
  createEmployee,
};
