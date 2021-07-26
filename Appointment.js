import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Appointment extends Model {
    static init(sequelize) {
        super.init(
            {
                date: Sequelize.DATE,
                canceled_at: Sequelize.DATE,
            },
            {
                sequelize,
            }
        );

        return this;
    }

    statis associate(models){
        this.belongsTo( models.User, { foreignKey: 'user_id', as: 'user'})
        this.belongsTo( models.User, { foreignKey: 'collaborator_id', as: 'collaborator'})
    }
}

export default Appointment;