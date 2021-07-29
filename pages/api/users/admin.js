import dbConnect from '../../../utils/dbConnect'
import nextConnect from 'next-connect'
import User from '../../../server/models/User'

export default nextConnect()

.get(async (req,res) => {
    try{
        await dbConnect()
        if(req.query.nickname) {
            const searchByNickname = await User.find({ nickname: { $regex: '.*' + req.query.nickname + '.*', $options: 'i' }}).exec()
            if(searchByNickname.length) {
                const nickInfo = searchByNickname.map(u => { 
                    return {
                        id: u._id,
                        nickname: u.nickname,
                        email: u.email,
                        role: u.role,
                        status: u.status
                }})
                return res.json(nickInfo)
            }
            else {
                return res.json({ error_msg: 'No se encontraron usuarios con esos parámetros'})
            }
        }
        else {
            const usersDb = await User.find().exec()
            const usersInfo = usersDb.map(u => { 
                return {
                    id: u._id,
                    nickname: u.nickname,
                    email: u.email,
                    role: u.role,
                    status: u.status
            }})
            return res.json(usersInfo)
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    } 
})

.put(async (req, res) => {
    try {
        await dbConnect()
        const userRole = await User.findByIdAndUpdate(req.query.id, { role: req.query.role }).exec()
        
        if(userRole){
            return res.json({ success_msg: `El usuario se ha actualizado con exito a ${req.query.role}`})
        }
        else{
            return res.json({ error_msg: 'Los datos enviados no son correctos'})
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    } 
})

.post(async (req, res) => {
    try{
        await dbConnect()
        
        const user = await User.findById(req.body.id)
        if(user.role === 'admin') {
            return res.send(true)
        }
        else {
            return res.send(false)
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    } 
})