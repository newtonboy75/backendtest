import { getOrder } from "../utils/db";

export const getOrderById = async (
    req: any,
    res: any
  ) => {
    try {
        const id = req.body.id
        const order = await getOrder(id)
    
        let data = {
            orderID: order?.orderID,
            customer_name: order?.customer_name,
            product: {
                name: order?.product?.name,
                price: order?.product?.price,
                qty: order?.product?.qty
            }
        }

        const response = await fetch('https://erp.company.com/order', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
    
        return res.status(200);
    
      } catch (error) {
        console.log(error);
        return res.sendStatus(400);
      }
  };