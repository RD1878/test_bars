export default class InfoData {
  //Создание строки с данными в таблице
  createItem(dataItem) {
    const tableRow = document.createElement('div');
    const tableDataName = document.createElement('div');
    const tableDataAddress = document.createElement('div');
    const tableDataPhone = document.createElement('div');
    const tableDataButtonDelete = document.createElement('div');
    const buttonDel = document.createElement('button');

    tableRow.classList.add('table__item');
    tableDataName.classList.add('table__item-full_name', 'table__column-name');
    tableDataAddress.classList.add('table__item-address', 'table__column-address');
    tableDataPhone.classList.add('table__item-phone', 'table__column-phone');
    tableDataButtonDelete.classList.add('table__column-button');
    buttonDel.classList.add('button__delete');

    tableRow.dataset.id = dataItem.id;
    tableDataName.textContent = dataItem.full_name;
    tableDataAddress.textContent = dataItem.address;
    tableDataPhone.textContent = dataItem.phone;

    buttonDel.textContent = 'Удалить';

    tableDataName.contentEditable = true;
    tableDataAddress.contentEditable = true;
    tableDataPhone.contentEditable = true;

    tableDataButtonDelete.appendChild(buttonDel);
    tableRow.appendChild(tableDataName);
    tableRow.appendChild(tableDataAddress);
    tableRow.appendChild(tableDataPhone);
    tableRow.appendChild(tableDataButtonDelete);

    return tableRow;
  }

  //Удаление строки с данными в таблице
  remove(event) {
    const container = document.querySelector('.table');
    const item = event.target.closest('.table__item');
    container.removeChild(item);
  }
}
