import _ from 'lodash';
import Bluebird from 'bluebird';
import Sequelize from 'sequelize';
import sequelize from '../../mySQLDB';

const mappings = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Item_Categories',
            key: 'id'
        },
    },
    attribute_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Attributes',
            key: 'id'
        },
    },
    attribute: {
        type: Sequelize.DataTypes.VIRTUAL(Sequelize.DataTypes.JSON, ['attribute'])
    },
    attribute_unit: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
    },
    updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
    }
}

const Bom = sequelize.define('Boms', mappings, {
    indexes: [
        {
            name: 'bom_id_index',
            method: 'BTREE',
            fields: ['id'],   
        },
        {
            name: 'bom_category_id_index',
            method: 'BTREE',
            fields: ['category_id'],   
        },
        {
            name: 'bom_attribute_id_index',
            method: 'BTREE',
            fields: ['attribute_id'],   
        },
        {
            name: 'bom_attribute_unit_index',
            method: 'BTREE',
            fields: ['attribute_unit'],   
        },
        {
            name: 'bom_createdAt_index',
            method: 'BTREE',
            fields: ['createdAt'],   
        },
        {
            name: 'bom_updatedAt_index',
            method: 'BTREE',
            fields: ['updatedAt'],   
        }
    ]
});

export default Bom;