
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
let minweight = document.querySelector('.minweight__input');
let maxweight = document.querySelector('.maxweight__input');

let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

let fruits = JSON.parse(fruitsJSON);



//ДИСПЛЕЙ


const display = () => {

  const removed = document.querySelectorAll('.fruit__item');
  const parent = document.querySelector('.fruits__list');
  removed.forEach(a => parent.removeChild(a));

for (let i = 0; i < fruits.length; i++) {

  const newLi = (fruits[i] == null) ? '' : document.createElement("li");
  a = "fruit__item ";

  if (fruits[i].color === "фиолетовый") {
    newLi.className = a + 'fruit_violet';
  } else if (fruits[i].color === "зеленый") {
    newLi.className = a + 'fruit_green';
  } else if (fruits[i].color === "розово-красный") {
    newLi.className = a + 'fruit_carmazin';
  } else if (fruits[i].color === "желтый") {
    newLi.className = a + 'fruit_yellow';
  } else if (fruits[i].color === "светло-коричневый") {
    newLi.className = a + 'fruit_lightbrown';
  } else (
    newLi.className = a + 'fruit_a'
  )

  parent.appendChild(newLi);


  const parent1 = document.querySelectorAll('.fruit__item');
  const div = document.createElement("div");
  div.className = "fruit__info";
  parent1[i].appendChild(div);


  const parent2 = document.querySelectorAll('.fruit__info');
  const div1 = document.createElement("div");
  div1.textContent = 'index: ' + i;
  parent2[i].appendChild(div1);


  a = Object.entries(fruits[i]);
  

  a.forEach( (a, index) => {
  
    if (index === 0) {
    return kind = 'kind: ' + a[1],
    parent2[i].insertAdjacentHTML('beforeend', `<div>${kind}</div>`);
  } else if (index === 1) {
    return color = 'color: ' + a[1],
    parent2[i].insertAdjacentHTML('beforeend', `<div>${color}</div>`);
  } else {
    return weight = 'weight (кг): ' + a[1],
    parent2[i].insertAdjacentHTML('beforeend', `<div>${weight}</div>`)
  }
}
  );



};
}

display();



/*** ПЕРЕМЕШИВАНИЕ ***/

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffleFruits = () => {
  let result = [];

  while (fruits.length > 0) {
    const prop = getRandomInt(0, fruits.length - 1);
    const prop1 = fruits[prop];
    fruits.splice(prop, 1);
    result.push(prop1);
    
  }


  (fruits === result) ? alert('Порядок не поменялся') : fruits = result;


}



shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
  console.log(1,2,3);
});



/*** ФИЛЬТРАЦИЯ ***/

const filterFruits = () => {

    let min1 = parseInt(minweight.value);
    let max1 = parseInt(maxweight.value);


    if (isNaN(min1 || max1)) {
      minweight.value = '';
      maxweight.value = '';
      return fruits;
    } else if (minweight.value === '' || maxweight.value === '') {
      minweight.value = '';
      maxweight.value = '';
      return fruits;
    }

    return fruits.filter((item) => {  
      if (min1 > max1) {

        minweight.value = '';
        maxweight.value = '';
        return fruits;
      }

    return item.weight > min1 && item.weight < max1;

}
)

}



filterButton.addEventListener('click', () => {
  
  fruits = filterFruits();
  display();

});


/*** СОРТИРОВКА ***/


let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки


const comparationColor = (a, b) => {
const priority = ['розово-красный', 'желтый', 'светло-коричневый', 'зеленый', 'фиолетовый'];
const priority1 = priority.indexOf(a.color);
const priority2 = priority.indexOf(b.color);
return priority1 > priority2;
};



  const sortAPI = {

  bubbleSort(arr, comparation) {
    
    const n = arr.length;
    for (let i = 0; i < n-1; i = i + 1) {
        for (let j = 0; j < n-1-i; j = j + 1) {
            if (comparation(arr[j], arr[j+1])) {
                let temp = arr[j+1];
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
},




  quickSort(arr, comparation) {
  if (arr.length <= 1) {
    return arr;
  }
  let index = Math.floor(arr.length / 2);
  let pivot = arr[index];
  let leftArr = [];
  let rightArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (i === index) {
      continue;
    }
    if (comparation(arr[i], pivot)) {
      rightArr.push(arr[i]);
    } else {
      leftArr.push(arr[i]);
    }
  }
  return [...sortAPI.quickSort(leftArr, comparation), pivot, ...sortAPI.quickSort(rightArr, comparation)];
},


  startSort(sort, arr, comparation) {

    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;

  },
};


sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;


sortChangeButton.addEventListener('click', () => {
  sortKindLabel.textContent === 'bubbleSort' ? sortKindLabel.textContent = 'quickSort' : sortKindLabel.textContent = 'bubbleSort';
});




sortActionButton.addEventListener('click', () => {

  sortTimeLabel.textContent = 'sorting...';
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  sortTimeLabel.textContent = sortTime;

});

/*** ДОБАВИТЬ ФРУКТ ***/


addActionButton.addEventListener('click', () => {

  if (kindInput.value === '' || colorInput.value === '' || weightInput.value === '') {

    alert('необходимо, чтобы были заполнены все поля');
    
  } else {

    fruits.push({kind: kindInput.value, color: colorInput.value, weight: weightInput.value});

    kindInput.value = '';
    colorInput.value = '';
    weightInput.value = '';

  display();
}
});