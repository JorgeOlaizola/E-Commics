import nextConnect from 'next-connect'
import dbConnect from '../../../utils/dbConnect'
import Location from '../../../server/models/Location'


export default nextConnect() 

.post( async (req, res) => {
    try {
        await dbConnect()

        const { location } = req.body
        const newLocation = new Location({ location })
        await newLocation.save()
        res.json({ success_msg: 'Se ha creado una nueva localización con éxito!', newLocation})
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})

.delete( async(req, res) => {
    try {
        await dbConnect()

        const { locationId } = req.body
        await Location.findByIdAndDelete(locationId)
        res.json({ success_msg: 'Se ha eliminado la localización con éxito'})
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})

.get( async(req, res) => {
    try {
        await dbConnect()

        const allLocations = await Location.find({})
        res.json(allLocations)        
    }

    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})

.put( async(req, res) => {
    try {
        await dbConnect()

        const { locationId, newTitle } = req.body
        const putLocation = await Location.findByIdAndUpdate(locationId, { location: newTitle }).exec()
        res.json({ success_msg: 'Se ha actualizado la localización con éxito', putLocation})

    }

    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})