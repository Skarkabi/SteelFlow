import Users from './User/User';
import Restrictions from './User/Restrictions';
import WorkFor from './User/WorkFor';
import Orders from './Order/Order';
import MaterialRequest from './Order/MaterialRequest';
import OrderItems from './Order/Item';
import Attribute from './Stock/Attribute';
import Bom from'./Stock/Bom';
import StockItems from './Stock/Item';
import ItemAttribute from './Stock/ItemAttributes';
import ItemCategory from './Stock/ItemCategory';
import Supplier from './Stock/Supplier';

Users.hasOne(Restrictions);
Users.hasOne(WorkFor);
Users.hasMany(Orders);
Restrictions.belongsTo(Users);
WorkFor.belongsTo(Users, { as: "manager" });
WorkFor.belongsTo(Users, { as: "employee" })
Orders.belongsTo(Users, { as: "sales_employee" });
Orders.belongsTo(Users, { as: "sales_manager" });
Orders.belongsTo(Users, { as: "production_employee" }); 
Orders.belongsTo(Users, { as: "production_manager" });

Orders.hasMany(MaterialRequest);
Orders.hasMany(OrderItems);
MaterialRequest.belongsTo(Orders);
OrderItems.belongsTo(Orders);
MaterialRequest.hasMany(OrderItems);
OrderItems.belongsTo(MaterialRequest);

ItemCategory.hasMany(StockItems);
ItemCategory.hasOne(Attribute);
ItemCategory.hasOne(Bom);
ItemCategory.hasMany(OrderItems);
StockItems.belongsTo(ItemCategory);
Attribute.belongsTo(ItemCategory);
Bom.belongsTo(ItemCategory);
OrderItems.belongsTo(ItemCategory);

StockItems.hasMany(ItemAttribute);
OrderItems.hasMany(ItemAttribute);
ItemAttribute.belongsTo(StockItems);
ItemAttribute.belongsTo(OrderItems);

StockItems.hasOne(Supplier);
Supplier.belongsTo(StockItems);

export default {
    Users, 
    Restrictions, 
    WorkFor, 
    Orders, 
    MaterialRequest, 
    OrderItems,
    ItemCategory,
    StockItems,
    Attribute,
    Bom,
    ItemAttribute,
    Supplier
}
