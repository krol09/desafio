import Appointment from "../models/Appointment";
import { startOfHour, parseISO, isBefore } from 'date-fns';
import * as Yup from 'yup';
import User from "../models/User";

class AppointmentController{

    async index(req,res){
        const { page = 1 } = req.query;

        const appointments = await Appointment.findAll({
            where: { user_id: req.userId , cancdeled_at: null},
            order: ['date'],
            attributes: ['id', 'date'],
            limit = 20,
            offset: (page - 1) * 20,
            include: [
                {
                    model: User,
                    as: 'collaborator',
                    attributes: [ 'id', 'date'],
                    include: [
                        {
                            model: File,
                            as: 'photo',
                            attributes: ['id', 'path', 'url']
                        }
                    ]
                }
            ]
        })
        return res.json(appointments)
    }

    async store(req, res){
        const schema = Yup.object().shape({
            collaborator_id: Yup.number().required(),
            date: Yup.date().required()
        })

        if (!(await schema.isValid(req.body))){
            return res.status(400).json({err: 'Inválido'})
        }

        const { collaborator_id, date } = req.body;

        const isCollaborator = await User.findOne({
            where: {id: collaborator_id, provider: true }
        })

        if (!isCollaborator){
            return res.status(401).json({ erro: 'Colaborador não encontrado' 
            })
        }

        const hourStart = startOfHour(parseISO(date));

        if( isBefore(startHour, new Date()) ){
            return res.status(400).json({
                erro: 'Horário não disponível'
            })
        }

        const checkAvailability = await Appointment.findOne(){
            where: {
                collaborator_id,
                canceled_at: null,
                date: startHour,
            }
        }

        if (checkAvailability){
            return res.status(400).json({
                erro: 'Horário não disponível para este colaborador'
            })
        }

        const appointment = await Appointment.create({
            user_id: req.userId,
            collaborator_id,
            date: startHour
        })

        return res.json(appointment)
    }
}

export default new AppointmentController();