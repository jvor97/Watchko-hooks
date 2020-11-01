import axios from "axios";

// export const handleOrder = () => {
//     return dispatch => {
//         type: 'ORDER_COUNTER'
//     }
// }

const generateId = () => {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

// const sumOrderPrice = updatedOrderData => {
//   // let orderDataSum = [...state.orderData];
//   updatedOrderData
//     .map(singleOrder => singleOrder.updatedPrice)
//     .reduce((acc, value) => acc + value);
//   return updatedOrderData;
// };

export const registerOrder = (title, price, typeOfOrder) => {
  return dispatch => {
    let orderData = {
      title: title,
      price: price,
      updatedPrice: price,
      typeOfOrder: typeOfOrder,
      id: generateId()
    };
    // console.log(updatedOrderData[0].id);
    dispatch(registerOrderAction(orderData));
    dispatch(updateNumOfOrders(orderData));
    // localStorage.setItem("orderData", orderData);
    // dispatch(storeOrderData(orderData));
    dispatch(sumOrderPrice());
    // return {
    //   ...state,
    //   counter: state.counter + 1,
    //   orderData: updatedOrderData,
    //   finalPrice: () => sumOrderPrice()
    // };
  };
};

export const registerOrderAction = orderData => {
  return {
    type: "REGISTER_ORDER",
    orderData: orderData
  };
};
export const updateNumOfOrders = orderData => {
  return {
    type: "UPDATE_NUM_ORDERS",
    orderData: orderData
  };
};

export const sumOrderPrice = () => {
  return {
    type: "SUM_PRICE"
  };
};

export const cartIncrement = id => {
  return dispatch => {
    dispatch(onCartIncrement(id));
    dispatch(sumOrderPrice());
  };
};
export const onCartIncrement = id => {
  return {
    type: "CART_INCREMENT",
    id: id
  };
};

export const cartDecrement = id => {
  return dispatch => {
    dispatch(onCartDecrement(id));
    dispatch(sumOrderPrice());
  };
};
export const onCartDecrement = id => {
  return {
    type: "CART_DECREMENT",
    id: id
  };
};

export const handleCheckout = () => {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(checkoutStart());
    axios
      .post(
        "https://watchko-94928.firebaseio.com/order.json",
        state.order.orderData
      )
      .then(response => {
        dispatch(checkoutSent());
      })
      .catch(err => {
        dispatch(checkoutFail(err.response.data.error));
        console.log(err.response.data.error);
      });
  };
};

export const checkoutStart = () => {
  return {
    type: "CHECKOUT_START"
  };
};
export const checkoutSent = () => {
  return {
    type: "CHECKOUT_SENT"
  };
};
export const checkoutFail = err => {
  return {
    type: "CHECKOUT_FAIL",
    error: err
  };
};
