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
// const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter((animal) => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  const especies = animals.find((item) => item.name === animal);
  return especies.residents.every((itemResidente) => itemResidente.age > age);
}

function employeeByName(employeeName = null) {
  if (employeeName === null) {
    return {};
  }
  return employees.find((i) => i.firstName === employeeName || i.lastName === employeeName);
}
// console.log(employeeByName(''));

function createEmployee(personalInfo, associatedWith) {
  const colaborador = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
  return colaborador;
}

function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}
// console.log(isManager('stephanieId'));

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push(createEmployee({ id, firstName, lastName }, { managers, responsibleFor }));
}

function animalCount(species = null) {
  if (species === null) {
    const espec = {};
    animals.forEach((element) => {
      espec[element.name] = element.residents.length;
    });
    return espec;
  }
  return animals.find((i) => i.name === species).residents.length;
}
// console.log(animalCount());

function entryCalculator(entrants = {}) {
  if (entrants === {}) {
    return 0;
  }
  return Object.keys(entrants).reduce((Ac, Corren) => Ac + (prices[Corren] * entrants[Corren]), 0);
}

// function animalMap(options) {
//   // seu código aqui
// }

function schedule(dayName = undefined) {
  const diaSem = {};
  Object.keys(hours).forEach((element) => {
    if (hours[element].open === hours[element].close) {
      diaSem[element] = 'CLOSED';
    } else {
      diaSem[element] = `Open from ${hours[element].open}am until ${hours[element].close - 12}pm`;
    }
  });
  if (dayName === undefined) {
    return diaSem;
  }
  return { [dayName]: diaSem[dayName] };
}
// console.log(schedule('Tuesday'));
function animalMaiorIdade(id) {
  const animal = animals.find((item) => item.id === id);
  return animal.residents.reduce((agru, valorCor) => {
    if (agru.age > valorCor.age) return agru;
    return valorCor;
  });
}

function oldestFromFirstSpecies(id) {
  const especieId = employees.find((pessoa) => pessoa.id === id).responsibleFor[0];
  return [animalMaiorIdade(especieId).name,
    animalMaiorIdade(especieId).sex,
    animalMaiorIdade(especieId).age];
}
// function increasePrices(percentage) {
//   // seu código aqui
// }
function animaisNomes(ids) {
  const names = [];
  ids.forEach((id) => {
    names.push(animals.find((animal) => animal.id === id).name);
  });
  return names;
}

function employeeCoverage(idOrName = undefined) {
  const AnimaisFuncio = {};
  if (idOrName === undefined) {
    employees.forEach((element) => {
      const key = `${element.firstName} ${element.lastName}`;
      AnimaisFuncio[key] = animaisNomes(element.responsibleFor);
    });
    return AnimaisFuncio;
  }
  employees.forEach((elemen) => {
    const key = `${elemen.firstName} ${elemen.lastName}`;
    if (elemen.firstName === idOrName || elemen.lastName === idOrName || elemen.id === idOrName) {
      AnimaisFuncio[key] = animaisNomes(elemen.responsibleFor);
    }
  });
  return AnimaisFuncio;
}
console.log(employeeCoverage('Azevado'));
module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
