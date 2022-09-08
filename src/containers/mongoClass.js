import mongoose from "mongoose"
import config from "../config"

mongoose.connect(config.mongoDB.URL, config.mongoDB.options)

export default class MongoClass {
    constructor(nombre, docSchema) {
        this.coleccion = mongoose.model(nombre, docSchema)
    }

    async write(all) {
        await fs.promises.writeFile(this.rutaDB, JSON.stringify(all))
    }

    async getAll() {
        try {
            const all = await this.coleccion.find({})
            return all
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async getById(id) {
        try {
            return await this.coleccion.find({ id: id })
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async save(obj) {
        try {
            const all = await this.getAll()
            obj["id"] = all.length ? ((all[all.length - 1].id) + 1) : 1
            obj.timestamp = this.getFecha()
            const newObj = await this.coleccion.create(obj)
            return newObj
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async update(id, obj) {
        try {
            obj.timestamp = this.getFecha()
            const newObj = await this.collection.findByIdAndUpdate(id, obj)
            return newObj
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async delete(id) {
        try {
            return await this.coleccion.findByIdAndDelete(id)
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async deleteFrom(id, subId) {
        try {
            const all = await this.getAll()
            const newAll = all.map((c) => {
                if (c["id"] == id) {
                    c.productos.filter(p => p.id !== subId)
                }
            })
            this.write(newAll)
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    getFecha = () => {
        const date = new Date()
        const fecha = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} a las ${date.getHours()}:${date.getMinutes()}hs`
        return fecha
    }
}


