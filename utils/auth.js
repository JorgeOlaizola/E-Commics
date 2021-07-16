import Token from '../server/models/Token'

export const validateToken = async (token) => {
    const match = await Token.find({ token: token })
    if(match.length) return true
    else return false
}

// export const CheckTokenDate = setInterval( async () => {
//     const allTokens = await Token.find({})
//     const actualDate = new Date()
//     allTokens.map(Token => {
//         console.log(Token.updated_at.getTime() < actualDate.getTime())
//     })

//  }
// , 10000)