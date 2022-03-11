export default class MemoryContainer {
  constructor() {
    this.items = [];
  }

  findOne(id) {
    const item = this.items.find((item) => item.id == id);
    if (!item) {
      throw { message: `Error al listar: elemento no encontrado` };
    } else {
      return item;
    }
  }

  findAll() {
    return [...this.items];
  }

  updateOne(item) {
    let newId;
    if (this.items.length == 0) {
      newId = 1;
    } else {
      newId = this.items[this.elementos.length - 1].id + 1;
    }

    const newItem = { ...elem, id: newId };
    this.elementos.push(newItem);
    return item;
  }

  updateOne(id, item) {
    elem.id = Number(elem.id);
    const index = this.elementos.findIndex((p) => p.id == elem.id);
    if (index == -1) {
      throw new Error(`Error al actualizar: elemento no encontrado`);
    } else {
      this.elementos[index] = elem;
      return elem;
    }
  }

  deleteOne(id) {
    const index = this.elementos.findIndex((elem) => elem.id == id);
    if (index == -1) {
      throw new Error(`Error al borrar: elemento no encontrado`);
    } else {
      return this.elementos.splice(index, 1);
    }
  }

  deleteAll() {
    this.elementos = [];
  }
}
