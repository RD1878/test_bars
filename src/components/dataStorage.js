export default class DataStorage {
  saveData(data) {
    localStorage.setItem('info', JSON.stringify(data));
  }

  getData() {
    return JSON.parse(localStorage.getItem('info'));
  }

  removeItem(id) {
    const array = this.getData();
    const indexItem = array.findIndex((element) => element.id === id);
    const leftArr = array.slice(0, indexItem);
    const rightArr = array.slice(indexItem + 1);
    const newArray = [...leftArr, ...rightArr];
    this.saveData(newArray);
  }
}
