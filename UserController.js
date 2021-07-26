import * as Yup from 'yup';
import User from '../models/User';

class UserController{
    async store(req,res){

        const schema = Yup.object().shape({
            name: Yup.string().required,
            email: Yup.string().required,
            password: Yup.string().required().min(6),
        });
        
        const userExists = await User.findOne({ where: { email: }})

        if (userExists){
            return res.status(400).json({ error: 'Usuário já cadastrado'})
        };

        const { id, name, email, provider } = await User.createUser

        return res.json({
            id,
            name,
            email,
            provider
        });
    }
};

async update( req, res ) {
    
    const schema = Yup.object().shape({
        name: Yup.string().required,
        email: Yup.string().required,
        password: Yup.string().required().min(6).when(
            'oldPassword', (oldPassword, field) =>
            oldPassword ? field.required() : field
        ),
        confirmPassword: Yup.string().when( 'password', 
        (password, field) => password ? field.required().oneOf([Yup.ref('password')]) : field)
    });

    if ( !(await schema.isValid(req.body))){
        return res.status(400).json({
            message: 'Falha na validação'
        });
    };
};