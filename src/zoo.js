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
const { animals, employees, prices, hours } = require('./data');

function animalsByIds(...ids) {
  if (ids === undefined) {
    return [];
  }
  return animals.filter((specie) => (ids.includes(specie.id)));
}

function animalsOlderThan(animal, age) {
  const species = animals.find((group) => group.name === animal);
  return species.residents.every((singleAnimal) => singleAnimal.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find(((employee) =>
    employee.firstName === employeeName || employee.lastName === employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return newEmployee;
}

function isManager(id) {
  return employees.some((worker) => worker.managers.includes(id));
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
  ) {
  const criaObjeto = { 
    id,
    firstName, 
    lastName, 
    managers,
    responsibleFor,
  };
  const addObjEmployee = data.employees.push(criaObjeto);
  return addObjEmployee;
}

function animalCount(species) {
  const animalCountObject = {};
  data.animals.forEach((animal) => {
    animalCountObject[animal.name] = animal.residents.length;
  });

  if (!species) return animalCountObject;
  return animalCountObject[species];
}

function entryCalculator(entrants = 0) {
  if (entrants === undefined || entrants.length === 0) {
    return 0;
  }
  let sumEntrants = 0;
  const entrantsType = Object.keys(entrants);
  entrantsType.forEach((property) => {
    sumEntrants += prices[property] * entrants[property];
  });
  return sumEntrants;
}

//  function animalMap(options) {
 
//  }

 function schedule(dayName) {
  const schedules = {};
  const days = Object.keys(hours);
  days.forEach((day) => {
    const { open } = hours[day];
    const { close } = hours[day];
    if (day === 'Monday') {
      schedules[day] = 'CLOSED';
    } else {
      schedules[day] = `Open from ${open}am until ${close - 12}pm`;
    }
  });
  if (dayName === undefined || dayName === {}) {
    return schedules;
  }
  return { [dayName]: schedules[dayName] };
 }

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
