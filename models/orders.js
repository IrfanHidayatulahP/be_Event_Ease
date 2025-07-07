const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    tiket_kategori_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ticket_categories',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM('pending','paid','cancelled'),
      allowNull: false,
      defaultValue: "pending"
    },
    jumlah_tiket: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_harga: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false
    },
    tanggal_pemesanan: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'orders',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "orders_ibfk_30",
        using: "BTREE",
        fields: [
          { name: "tiket_kategori_id" },
        ]
      },
    ]
  });
};
