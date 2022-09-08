import admin from 'firebase-admin'
import serviceAccount from '../serviceAccountKey.json'

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

class FirebaseClass {
    constructor(nombre) {
        this.db = admin.firestore()
        this.collection = this.db.collection(nombre)
    }

    async getAll() {
        try {
            const all = await this.collection.get()
            return all.docs.map(doc => doc.data())
        } catch (err) {
            throw new Error(`Error: ${error}`)
        }
    }
    async getOne(id) {
        try {
            const obj = await this.collection.doc(id).get()
            return obj.data()
        } catch (err) {
            throw new Error(`Error: ${error}`)
        }
    }

    async save(obj) {
        try {
            const all = await this.getAll()
            obj["id"] = all.length ? ((all[all.length - 1].id) + 1) : 1
            obj.timestamp = this.getFecha()
            const newObj = await this.collection.add(obj)
            return newObj.id
        } catch (err) {
            throw new Error(`Error: ${error}`)
        }
    }

    async update(id, obj) {
        try {
            const newObj = await this.collection.doc(id).update(obj)
            return newObj
        } catch (err) {
            throw new Error(`Error: ${error}`)
        }
    }

    async delete(id) {
        try {
            return await this.collection.doc(id).delete()
        } catch (err) {
            throw new Error(`Error: ${error}`)
        }
    }

}

export default FirebaseClass