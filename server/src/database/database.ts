import mongoose from 'mongoose'

(async ()=>{

    try {
        const db = await mongoose.connect("mongodb://localhost/capturas_db")
        console.log('DB connected to', db.connection.name)
    } catch (error) {
        console.log(error)
    }
    
})();