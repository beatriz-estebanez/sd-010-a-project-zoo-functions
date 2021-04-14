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
  const animalId = data.animals.filter((animal) => ids.some((id) => id === animal.id));
  return animalId;
}

function animalsOlderThan(animal, age) {
  const animals = data.animals.find((selected) => selected.name === animal);
  return animals.residents.every((idd) => idd.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const selectedEmployee = data.employees.find((employee) => employee.firstName === employeeName
  || employee.lastName === employeeName);
  return selectedEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

// referência https://www.w3schools.com/jsref/jsref_includes.asp#:~:text=The%20includes()%20method%20determines,()%20method%20is%20case%20sensitive.
function isManager(id) {
  return data.employees.some((manager) => manager.managers.includes(id));
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
  if (!species) {
    return data.animals.reduce((acc, item) => {
      acc[item.name] = item.residents.length;
      return acc;
    }, {});
  }
  return data.animals.find((animal) => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  const price = data.prices;
  if (!entrants || entrants === {}) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const finalPrice = (Adult * price.Adult) + (Child * price.Child) + (Senior * price.Senior);
  return finalPrice;
}

// function animalMap(options) {}

function schedule(dayName) {
  const openingSchedule = (day) => {
    const openTime = data.hours[day].open;
    const closingTime = data.hours[day].close;
    if (openTime === 0 && closingTime === 0) {
      return 'CLOSED';
    }
    return `Open from ${openTime}am until ${closingTime - 12}pm`;
  };
  const days = Object.keys(data.hours);
  const scheduleInfo = {};
  if (dayName === undefined) {
    days.forEach((day) => {
      scheduleInfo[day] = openingSchedule(day);
    });
  } else {
    scheduleInfo[dayName] = openingSchedule(dayName);
  }
  return scheduleInfo;
}

function oldestFromFirstSpecies(id) {
  const getEmployee = data.employees.find((employee) => employee.id === id);
  const getResponsible = getEmployee.responsibleFor[0];
  const responsibleFor = data.animals.filter((getAnimal) =>
    getAnimal.id === getResponsible)[0].residents;
  const sortedAge = responsibleFor.sort((ageA, ageB) => (ageA.age < ageB.age ? 1 : -1));
  return Object.values(sortedAge[0]);
}

function increasePrices(percentage) {
  const { Adult, Senior, Child } = data.prices;

  data.prices.Adult = (Math.ceil(Adult * (percentage + 100))) / 100;
  data.prices.Child = (Math.ceil(Child * (percentage + 100))) / 100;
  data.prices.Senior = (Math.ceil(Senior * (percentage + 100))) / 100;
}

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
