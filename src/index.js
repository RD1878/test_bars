import "./index.css";
import InfoData from './components/infoData';
import DataStorage from './components/dataStorage';
import Popup from './components/popup';
//Исходные данные
const data = require('./data/Ipu.json');
//Генереатор id
const shortid = require('shortid');

//DOM-элементы
const table = document.querySelector('.table');
const popupAddWindow = document.querySelector('.popup');
const buttonAddCancel = document.querySelector('.popup__button-cancel');
const buttonAdd = document.querySelector('.button__add');
const formInfo = document.forms.info;
const nameInput = formInfo.elements.name;
const addressInput = formInfo.elements.address;
const phoneInput = formInfo.elements.phone;

//Экземпляры классов
const infoData = new InfoData();
const dataStorage = new DataStorage();
const popupAdd = new Popup({
  popup: popupAddWindow,
  button: buttonAdd
});

//Функция создания объекта с данными
const createNewItem = (name, address, phone) => {
  return {
    "full_name": name,
    "address": address,
    "phone": phone,
    "id": shortid.generate()
  };
};

//Слушатель на добавление строки с данными
formInfo.addEventListener('submit', (event) => {
  event.preventDefault();
  const newItem = createNewItem(nameInput.value, addressInput.value, phoneInput.value);
  const data = dataStorage.getData();
  data.push(newItem);
  dataStorage.saveData(data);
  table.appendChild(infoData.createItem(newItem));
  formInfo.reset();
  popupAdd.close();
  buttonAdd.removeAttribute('disabled');
});

//Слушатель на кнопку добавления строки с данными
buttonAdd.addEventListener('click', (event) => {
  popupAdd.open();
  //Кнопка отмена
  buttonAddCancel.addEventListener('click', (event) => {
    popupAdd.close();
  });
});

//Слушатель на кнопку удаления
table.addEventListener('click', (event) => {
  if (event.target.classList.contains('button__delete')) {
    infoData.remove(event);
    dataStorage.removeItem(event.target.closest('.table__item').dataset.id);
  }
});

//Слушатель на клик мышки после редактирования информации
table.addEventListener('mouseout', (event) => {
  const keyObject = (event.target.classList.value).slice(12);
  const itemId = event.target.closest('.table__item').dataset.id;

  const storageArray = dataStorage.getData();
  const indexStorage = storageArray.findIndex((element) => element.id === itemId);

  const leftArr = storageArray.slice(0, indexStorage);
  const rightArr = storageArray.slice(indexStorage + 1);
  const itemArray = storageArray[indexStorage];
  itemArray[keyObject] = event.target.textContent;
  const newArray = [...leftArr, itemArray, ...rightArr];
  dataStorage.saveData(newArray);
});

//Рендеринг начальных данных
function render(dataArray) {
  dataStorage.saveData(dataArray);
  const info = dataStorage.getData();
  info.forEach((element) => {
    table.appendChild(infoData.createItem(element));
  });
}

render(data);
