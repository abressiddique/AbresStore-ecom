import { getOrders } from "@/lib/actions/actions";
import { auth } from "@clerk/nextjs";
import Image from "next/image";

const Orders = async () => {
  const { userId } = auth();
  const orders = await getOrders(userId as string);

  console.log("Fetched Orders:", orders);

  // Check if orders are not found or if the array is empty
  if (!orders || orders.length === 0) {
    return <p className="text-body-bold my-5">You have no orders yet.</p>;
  }

  return (
    <div className="px-10 py-5 max-sm:px-3">
      <p className="text-heading3-bold my-10">Your Orders</p>

      <div className="flex flex-col gap-10">
        {orders.map((order: OrderType) => (
          <div className="flex flex-col gap-8 p-4 hover:bg-grey-1" key={order._id}>
            <div className="flex gap-20 max-md:flex-col max-md:gap-3">
              <p className="text-base-bold">Order ID: {order._id}</p>
              <p className="text-base-bold">Total Amount: ₹{new Intl.NumberFormat('en-IN').format(order.totalAmount)}</p>
            </div>

            <div className="flex flex-col gap-5">
              {order.products?.length > 0 ? (
                order.products.map((orderItem: OrderItemType) => (
                  <div className="flex gap-4" key={orderItem.product._id}>
                    <Image
                      src={orderItem.product.media[0]}
                      alt={orderItem.product.title}
                      width={100}
                      height={100}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <div className="flex flex-col justify-between">
                      <p className="text-small-medium">
                        Title: <span className="text-small-bold">{orderItem.product.title}</span>
                      </p>
                      {orderItem.color && (
                        <p className="text-small-medium">
                          Color: <span className="text-small-bold">{orderItem.color}</span>
                        </p>
                      )}
                      {orderItem.size && (
                        <p className="text-small-medium">
                          Size: <span className="text-small-bold">{orderItem.size}</span>
                        </p>
                      )}
                      <p className="text-small-medium">
                        Unit price: <span className="text-small-bold">₹{new Intl.NumberFormat('en-IN').format(orderItem.product.price)}</span>
                      </p>
                      <p className="text-small-medium">
                        Quantity: <span className="text-small-bold">{orderItem.quantity}</span>
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No products found for this order.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

export const dynamic = "force-dynamic";
