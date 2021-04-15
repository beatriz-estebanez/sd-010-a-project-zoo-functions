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

const { animals, employees, prices } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter((animais) => ids.includes(animais.id));
}
// console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce', '89be95b3-47e4-4c5b-b687-1fabf2afa274'));// test 1
// console.log(animalsByIds());// test 2

function animalsOlderThan(species, animalAge) {
  return animals
    .find(({ name }) => name === species)
    .residents
    .every(({ age }) => (age >= animalAge));
}

// console.log(animalsOlderThan('lions',15)); // TEST 1 - Expected false
// console.log(animalsOlderThan('lions',2)); // TEST 2 - Expected true
// console.log(animalsOlderThan('otters',7)); // TEST 4 - Expected true
// console.log(animalsOlderThan('penguins',10)); // TEST 3 - Expected false
// console.log(animals[0].residents[0].age) // Propriedade age

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees
    .find((employee) => employee.firstName === employeeName
    || employee.lastName === employeeName);
}
// console.log(employeeByName('Ola')) // TEST 1 - Expected objeto com fistName = 'Ola'
// console.log(employeeByName('Orloff')) // TEST 2 - Expected objeto com lastName = 'Orloff'
// console.log(employeeByName('')) // TEST 3 - Expected objeto vazio {}
// console.log(employeeByName()) // TEST 4 - Expected objeto vazio {}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}
// console.log(createEmployee({ id:'007', firstName:'James', lastName:'Bond' },
// { managers:['100','101'], responsibleFor:['snake','bear'] })) // TEST 1 - Expected objeto com funcionáiro

function isManager(id) {
  if (!id) { return false; }
  return (employees.map(({ managers }) => (managers))
    .some(([ids]) => ids === id)
  );
}
// console.log(isManager('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1')) // TEST 1 - Retorna falso, pois Nigel não é gerente de ninguém
// console.log(isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83')) // TEST 2 - Retorna true, pois Burl é gerente de algumas pessoas
// console.log(isManager('')) // TEST 3 - Retorna false, pois é uma string vazia
// console.log(isManager()) // TEST 4 - Retorna false, pois não há argumento passado par a função

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push(
    { id, firstName, lastName, managers, responsibleFor },
  );
}
// console.log(addEmployee('007','James', 'Bond',
//             ['0e7b460e-acf4-4e17-bcb3-ee472265db83', 'baa6e93a-f295-44e7-8f70-2bcdc6f6948d'],
//             ['baa6e93a-f295-44e7-8f70-2bcdc6f6948d', '0938aa23-f153-4937-9f88-4858b24d6bce']),
//             employees) // TESTE 1 - Retorna o objeto employee com o novo empregado no final da lista

function animalCount(specie) {
  if (!specie) {
    const animalList = {};
    animals.forEach((animal) => { animalList[animal.name] = animal.residents.length; });
    return animalList;
  }
  return (animals.find((animal) => animal.name === specie)).residents.length;
}
// console.log ( animalCount('lions') ) // TESTE 1 -> Retorna 4, que é a população de leões
// console.log ( animalCount() ) // TESTE 2 -> Retorna um objeto contendo o nome do animale a população

function entryCalculator(entrants) {
  if (!entrants || Object.entries(entrants).length === 0) { return 0; }
  return Object.keys(entrants)
    .map((key) => (entrants[key] * prices[key]))
    .reduce((acc, elemento) => acc + elemento);
}
// console.log(entryCalculator({Adult:10,Child:20,Senior:15,})) // TESTE 1 -> Retorna 1294.55
// console.log(entryCalculator({Adult:0,Child:0,Senior:0,})) // TESTE 2 -> Retorna 0
// console.log(entryCalculator()) // TESTE 3 -> Retorna 0
// console.log(entryCalculator('')) // TESTE 4 -> Retorna 0
// console.log(entryCalculator({})) // TESTE 5 -> Retorna 0

// function animalMap(options) {
//   // seu código aqui
// }

function schedule(dayName) {
  const horarioSemanal = {};
  const dias = Object.keys(data.hours).map((dia) => dia);
  const horarios = Object.values(data.hours).map((horario) => horario);
  horarios.forEach(({ open, close }, index) => {
    const horadioDiario = (day) => {
      if (day !== 'Monday') { return `Open from ${open}am until ${close - 12}pm`; }
      return 'CLOSED';
    };
    horarioSemanal[dias[index]] = horadioDiario(dias[index]);
  });
  if (!dayName) { return horarioSemanal; }
  return { [dayName]: horarioSemanal[dayName] };
}
// console.log(schedule()); // TESTE 1 - Retorna o quadro de horarios semanal
// console.log(schedule('Wednesday')); // TESTE 2 - Retorna o horário do dia
// console.log(schedule('Monday')); // TESTE 3 - Retorna CLOSED, por ser domingo

// function oldestFromFirstSpecies(id) {
//   // seu código aqui
// }

function increasePrices(percentage) {
  if (!percentage) { percentage = 100 };
  const atualizaPreco = (preco) => {return (preco*( (percentage/100) + 1 ))};
  const arredondar = (numero) => { return (Math.floor(numero*100)/100) };
  return Object.keys(prices).map((key) => ({ [key]: arredondar(atualizaPreco(prices[key])) }));
}
// console.log(increasePrices(20)) // TESTE 1  -> O preço sobe 20%
// console.log(increasePrices()) // TESTE 2 -> O preço não tem alteração
// console.log(increasePrices('')) // TESTE 3 -> O preço não tem alteração

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  //   animalMap,
  animalsByIds,
  employeeByName,
  //   employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  //   oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
