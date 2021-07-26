import jwt from 'jsonwebtoken';
import User from "../models/User";
import authConfig from '../../config/auth';
import * as Yup from 'yup';

class SessionController{
    async store(req, res){

        const schema = Yup.object().shape({
            email: Yup.string().required,
            password: Yup.string().required()
        })

        if ( !(await schema.isValid(req.body))){
            return res.status(400).json({
                message: 'Falha na validação'
            })
        }
        
        const { email, password } = req.body;
        
        const user = await User.fidnOne({ where: { email }})
        
        if (!user){

        }
        
        console.log(authConfig.secret)



        return res.json({
            user:{
                id,
                name,
                email
            },
            toke: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            })
        })


    }
}
export default new SessionController();
