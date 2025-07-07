var DataTypes = require("sequelize").DataTypes;
var _event_images = require("./event_images");
var _events = require("./events");
var _orders = require("./orders");
var _reviews = require("./reviews");
var _ticket_categories = require("./ticket_categories");
var _users = require("./users");
var _virtual_tickets = require("./virtual_tickets");

function initModels(sequelize) {
  var event_images = _event_images(sequelize, DataTypes);
  var events = _events(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var reviews = _reviews(sequelize, DataTypes);
  var ticket_categories = _ticket_categories(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var virtual_tickets = _virtual_tickets(sequelize, DataTypes);

  event_images.belongsTo(events, { as: "event", foreignKey: "event_id"});
  events.hasMany(event_images, { as: "event_images", foreignKey: "event_id"});
  reviews.belongsTo(events, { as: "event", foreignKey: "event_id"});
  events.hasMany(reviews, { as: "reviews", foreignKey: "event_id"});
  ticket_categories.belongsTo(events, { as: "event", foreignKey: "event_id"});
  events.hasMany(ticket_categories, { as: "ticket_categories", foreignKey: "event_id"});
  virtual_tickets.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(virtual_tickets, { as: "virtual_tickets", foreignKey: "order_id"});
  orders.belongsTo(ticket_categories, { as: "tiket_kategori", foreignKey: "tiket_kategori_id"});
  ticket_categories.hasMany(orders, { as: "orders", foreignKey: "tiket_kategori_id"});
  events.belongsTo(users, { as: "eo", foreignKey: "eo_id"});
  users.hasMany(events, { as: "events", foreignKey: "eo_id"});
  orders.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "user_id"});
  reviews.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(reviews, { as: "reviews", foreignKey: "user_id"});

  return {
    event_images,
    events,
    orders,
    reviews,
    ticket_categories,
    users,
    virtual_tickets,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
