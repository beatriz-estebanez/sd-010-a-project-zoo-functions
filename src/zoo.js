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

// Tive ajuda do meu marido para entender melhor as HOFs e conseguir desenvolver o projeto

const { employees, animals, prices, hours } = require('./data');
// const data = require('./data');

function animalsByIds(...ids) {
  if (ids === undefined) {
    return [];
  }
  return animals.filter((specie) => (ids.includes(specie.id)));
}

function animalsOlderThan(animal, age) {
  const foundAnimal = animals.find((specie) => (specie.name === animal));
  return foundAnimal.residents.every((resident) => (resident.age >= age));
}

function employeeByName(name) {
  const employee = employees
    .find((option) => (name === option.firstName || name === option.lastName));
  if (employee === undefined) {
    return {};
  }
  return employee;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };

  if (newEmployee.managers === undefined) {
    newEmployee.managers = [];
  }
  if (newEmployee.responsibleFor === undefined) {
    newEmployee.responsibleFor = [];
  }
  employees.push(newEmployee);
  return newEmployee;
}

function isManager(id) {
  return employees.some((option) => (option.managers.includes(id)));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  if (newEmployee.managers === undefined) {
    newEmployee.managers = [];
  }
  if (newEmployee.responsibleFor === undefined) {
    newEmployee.responsibleFor = [];
  }
  employees.push(newEmployee);
}

function animalCount(species) {
  if (species === undefined) {
    const allSpecies = {};
    // Usando o forEach para percorrer o array de animais e incluir os nomes das espécies e quantidades no objeto: https://www.w3schools.com/jsref/jsref_foreach.asp
    animals.forEach((animal) => {
      // Incluindo os animais e suas quantidades no objeto: https://gomakethings.com/how-to-add-a-new-item-to-an-object-at-a-specific-position-with-vanilla-js/#:~:text=Create%20a%20new%20object.,that%20to%20the%20new%20object.
      allSpecies[animal.name] = animal.residents.length;
    });
    return allSpecies;
  }
  const specie = animals.find((animal) => (species === animal.name));
  return specie.residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || entrants.length === 0) {
    return 0;
  }
  let sumAllEntrants = 0;
  // Como retornar as propriedades de um objeto em um array: https://riptutorial.com/javascript/example/9824/convert-object-s-values-to-array#:~:text=You%20can%20convert%20its%20values,obj%5Bkey%5D%3B%20%7D)%3B%20console.
  const entrantsType = Object.keys(entrants);
  entrantsType.forEach((property) => {
    sumAllEntrants += prices[property] * entrants[property];
  });
  return sumAllEntrants;
}

// function animalMap(options) {
//   // seu código aqui
// }

// Essa função foi criada para corrigir a refatoração sugerida pelo lint. Ela faz parte da função schedule dos exercícios.
function generateText(day) {
  if (hours[day].close > 12) {
    hours[day].close -= 12;
  }
  if (hours[day].open === 0) {
    return 'CLOSED';
  }
  return `Open from ${hours[day].open}am until ${hours[day].close}pm`;
}

function schedule(dayName) {
  const scheduleOfWeek = {};
  const days = Object.keys(hours);
  days.forEach((day) => {
    if (dayName === undefined || dayName === day) {
      scheduleOfWeek[day] = generateText(day);
    }
  });
  return scheduleOfWeek;
}

function oldestFromFirstSpecies(id) {
  const manager = employees.find((employee) => (id === employee.id));
  const foundAnimal = animals
    .find((specie) => (specie.id === manager.responsibleFor[0]
      || specie.name === manager.responsibleFor[0]));
  const oldestAnimal = foundAnimal.residents
    .sort((animal1, animal2) => animal2.age - animal1.age)[0];
  return [oldestAnimal.name, oldestAnimal.sex, oldestAnimal.age];
}

// Como usar o forEach em um objeto: https://www.horadecodar.com.br/2021/02/09/como-percorrer-um-objeto-em-javascript/
// Como arredondar número decimal para 2 casas: http://www.javascriptkit.com/javatutors/formatnumber.shtml
// Como arredondar um número decimal: https://medium.com/swlh/how-to-round-to-a-certain-number-of-decimal-places-in-javascript-ed74c471c1b8
// Como fazer que o retorno do Math.round + .toFixed seja um número e não uma string:
// https://stackoverflow.com/questions/2283566/how-can-i-round-a-number-in-javascript-tofixed-returns-a-string
function increasePrices(percentage) {
  let increase = 0;
  const value = Object.keys(prices);
  value.forEach((price) => {
    increase = prices[price] + ((prices[price] * percentage) / 100);
    prices[price] = +(Math.round(increase * 100) / 100).toFixed(2);
  });
}

// Referências usadas para a função abaixo:
// Como usar o forEach: https://www.w3schools.com/jsref/jsref_foreach.asp e o map: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/map
// Como adicionar um elemento no array: https://www.w3schools.com/jsref/jsref_push.asp
function employeeCoverage(idOrName) {
  let managers = [];
  if (idOrName === undefined) {
    managers = employees;
  } else {
    const manager = employees.find((employee) => (idOrName === employee.id
      || idOrName === employee.firstName || idOrName === employee.lastName));
    managers.push(manager);
  }
  const managerOfSpecies = {};
  managers.forEach((manager) => {
    const speciesName = manager.responsibleFor.map((specieId) => {
      const animal = animals.find((object) => (object.id === specieId));
      return animal.name;
    });
    managerOfSpecies[`${manager.firstName} ${manager.lastName}`] = speciesName;
  });

  return managerOfSpecies;
}

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
  increasePrices,
  createEmployee,
};
