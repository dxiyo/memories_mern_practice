import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {  
    try {
        // grab the token
        const token = req.headers.authorization.split(' ')[1]
        // decides if this token is from GoogleAuth or a custom token of ours. if its length is less than 500 then it's ours.
        const isCustomAuth = token.length < 500
        // the data we want to get from the token will be stored in this variable
        let decodedData
        
        if( token && isCustomAuth ) {
            decodedData = jwt.verify(token, 'test') // 'test' is the secret word i used in the creation of the token in the user controller
    
            req.userId = decodedData?.id
        } else {
            decodedData = jwt.decode(token)
    
            req.userId = decodedData?.sub // sub is the id in the googleAuth stuff
        }
    
        next()
        
    } catch (error) {
        console.log(error)
    }
}

export default auth