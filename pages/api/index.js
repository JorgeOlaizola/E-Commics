// export default async (req, res) => {
//     switch (req.method) {
//         case 'GET':
//             try {
//                
//             } 
//             catch (error) {
//                 console.log(error)
//                 res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
//             }
//             break
//         default:
//              res.setHeader('Allow', ['GET'])
//              res.status(405).end(`Method ${method} Not Allowed`)
//             break
//     }

// }