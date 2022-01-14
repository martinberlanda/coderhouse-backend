import fs from 'fs'

export default class Contenedor {

    constructor(nombreDeArchivo) {
        this.nombreDeArchivo = nombreDeArchivo
    }

    async #accessFile() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.nombreDeArchivo, 'utf8', (err, data) => {
                if (err) {
                    try {
                        fs.writeFileSync(this.nombreDeArchivo, '[]')
                        console.log('Archivo no encontrado, se creará uno nuevo')
                        resolve(this.#accessFile()) // Recursividad
                    } catch (error) {
                        console.error(error)
                        reject(error)
                    }
                } else resolve(data)
            })
        })
    }

    async save(objeto) {
        try {
            let json = JSON.parse(await this.#accessFile())
            let id
            if (json.length === 0) {
                id = 1
                json.push({ ...objeto, id: id })
            } else {
                id = json[json.length - 1].id + 1
                json.push({ ...objeto, id: id })
            }
            fs.writeFileSync(this.nombreDeArchivo, JSON.stringify(json), error => {
                if (error) throw new Error(error)
            })
            return id
        } catch (error) {
            console.error(error)
        }
    }

    async getById(id) {
        try {
            let json = JSON.parse(await this.#accessFile())
            let producto = json.find(producto => producto.id === id)
            if (producto) return producto
            else return null
        }
        catch (error) {
            console.error(error)
        }
    }

    async getRandom() {
        try {
            let json = JSON.parse(await this.#accessFile())
            let randomProducto = json[Math.floor(Math.random() * json.length)]
            if (randomProducto) return randomProducto
            else return null
        }
        catch (error) {
            console.error(error)
        }
    }

    async getAll() {
        try {
            return JSON.parse(await this.#accessFile())
        }
        catch (error) {
            console.error(error)
        }
    }

    async deleteAll() {
        try {
            fs.writeFileSync(this.nombreDeArchivo, JSON.stringify([]), error => {
                if (error) throw new Error(error)
                console.log('Se eliminaron todos los productos')
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    async deleteById(id) {
        try {
            let json = JSON.parse(await this.#accessFile())
            let index = json.findIndex(producto => producto.id === id)
            json.splice(index, 1)
            fs.writeFileSync(this.nombreDeArchivo, JSON.stringify(json), error => {
                if (error) throw new Error(error)
                console.log('Se eliminó el producto con id: ' + id)
            })
        } catch (error) {
            console.error(error)
        }

    }

}