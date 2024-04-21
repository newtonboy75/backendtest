import mongoose from "mongoose";

//schemas
const BarberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
});

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
});

const OrderSchema = new mongoose.Schema({
    orderID: { type: String, required: true },
    customer_name: { type: String, required: true },
    product: {
        name: { type: String, required: true },
        price: { type: String, required: true },
        qty: { type: String, required: true },
    }
  });

//dbmodels
export const BarberModel = mongoose.model("User", BarberSchema);
export const CustomerModel = mongoose.model("Barbel", CustomerSchema);
export const OrderModel = mongoose.model("Order", OrderSchema);

//queries barbers
export const getBarbers = () => BarberModel.find();
export const getActiveBarbers = () => BarberModel.find({ status: "active" });

//queries customers
export const getCurrentCustomers = () => CustomerModel.find();
export const getActiveCustomers = () => CustomerModel.find({ status: "active" });

//queries orders
export const getOrder = (orderID: number) => OrderModel.findById(orderID);
export const createOrder = (values: {}) => new OrderModel(values).save().then((user) => user.toObject());