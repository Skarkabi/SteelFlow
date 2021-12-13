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
import Reserve from './Order/Reserve';
import RequestedItem from './Order/RequestedItem';

Users.hasOne(Restrictions);
Users.hasOne(WorkFor, {foreignKey: "employeeId"});
Users.hasMany(Orders, { foreignKey: "requestedBy", as: "requestEmployee" });
Users.hasMany(Orders, { foreignKey: "salesEmployeeId", as: "salesEmployee" });
Users.hasMany(Orders, { foreignKey: "salesManagerId", as: "salesManager" });
Users.hasMany(Orders, { foreignKey: "productionManagerId", as: "productionManager" });
Users.hasMany(Orders, { foreignKey: "productionEmployeeId", as: "productionEmployee" });
Restrictions.belongsTo(Users);

Orders.hasMany(MaterialRequest);
Orders.hasMany(OrderItems);
OrderItems.hasMany(MaterialRequest);
MaterialRequest.hasMany(RequestedItem);
MaterialRequest.belongsTo(Orders);
OrderItems.belongsTo(Orders);

ItemCategory.hasMany(StockItems);
ItemCategory.hasMany(Attribute);
ItemCategory.hasMany(Bom);
ItemCategory.hasMany(OrderItems);
ItemCategory.hasMany(RequestedItem);
StockItems.belongsTo(ItemCategory);
Attribute.belongsTo(ItemCategory);
Bom.belongsTo(ItemCategory);
OrderItems.belongsTo(ItemCategory);

RequestedItem.hasMany(ItemAttribute);
StockItems.hasMany(ItemAttribute);
OrderItems.hasMany(ItemAttribute);
ItemAttribute.belongsTo(StockItems);
ItemAttribute.belongsTo(OrderItems);
ItemAttribute.belongsTo(Attribute);
ItemAttribute.belongsTo(RequestedItem);


Supplier.hasMany(StockItems);
StockItems.belongsTo(Supplier);

OrderItems.hasMany(Reserve);
StockItems.hasMany(Reserve);


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
