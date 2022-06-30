import fs from "fs"

class Api {
    constructor(rutaDB) {
        this.rutaDB = (__dirname + rutaDB)
    }

    async write(all) {
        await fs.promises.writeFile(this.rutaDB, JSON.stringify(all))
    }

    async getAll() {
        try {
            const all = await fs.promises.readFile(this.rutaDB)
            console.log(JSON.parse(all))
            return JSON.parse(all)
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async getById(id) {
        try {
            const all = await this.getAll()
            return all.find(a => a.id == id)
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async save(obj) {
        try {
            const all = await this.getAll()
            obj["id"] = all.length ? ((all[all.length - 1].id) + 1) : 1
            obj.timestamp = this.getFecha()
            all.push(obj)
            this.write(all)
            return obj["id"]
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }
    async update(id, obj) {
        try {
            const all = await this.getAll()
            const newAll = all.map(p, () => {
                if (p.id == id) {
                    p = { ...obj, timestamp: this.getFecha() }
                }
            })
            this.write(newAll)
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async delete(id) {
        try {
            const all = await this.getAll()
            const newAll = all.filter(p => p.id !== id)
            this.write(newAll)
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

export default Api

