const initialState = {
  counter: 0,
  orderData: [],
  finalPrice: 0,
  error: null,
  loading: false,
  messageSent: false
};

const sumOrderPrice = state => {
  let orderDataSum = [...state.orderData];
  let sum = orderDataSum.reduce(
    (acc, singleOrder) => acc + singleOrder.updatedPrice,
    0
  );
  return sum;
};

const getCurrentObj = (state, id) => {
  let copyOrderData = [...state.orderData];
  let currentObject = copyOrderData.find(currentObj => currentObj.id === id);
  return currentObject;
};

// const groupDuplicatedOrders = (updatedOrderData, currObj, id) => {
//   let copy = [...updatedOrderData];
// for (let i = 0; i < updatedOrderData.length; i++) {
//   updatedOrderData[i].numOfOrders = copy.filter(
//     movie =>
//       movie.title === updatedOrderData[i].title &&
//       movie.typeOfOrder === updatedOrderData[i].typeOfOrder
//   ).length;
//   updatedOrderData[i].updatedPrice =
//     updatedOrderData[i].numOfOrders * updatedOrderData[i].price;
// }

// for (let i = 0; i < updatedOrderData.length; i++) {
//   if (
//     copy.filter(
//       movie =>
//         movie.title === updatedOrderData[i].title &&
//         movie.typeOfOrder === updatedOrderData[i].typeOfOrder
//     )
//   ) {
//     updatedOrderData[i].numOfOrders += 1;
//   }
//   updatedOrderData[i].updatedPrice =
//     updatedOrderData[i].numOfOrders * updatedOrderData[i].price;
// }

//   if (
//     copy.filter(
//       movie =>
//         movie.title === currObj.title &&
//         movie.typeOfOrder === currObj.typeOfOrder
//     )
//   ) {
//     currObj.numOfOrders += 1;
//   }
//   currObj.updatedPrice = currObj.numOfOrders * currObj.price;

//   updatedOrderData[id] = currObj;

//   updatedOrderData = updatedOrderData.reduce((uniqueArr, object) => {
//     if (
//       !uniqueArr.some(
//         obj =>
//           obj.title === object.title && obj.typeOfOrder === object.typeOfOrder
//       )
//     ) {
//       uniqueArr.push(object);
//     }
//     return uniqueArr;
//   }, []);

//   return updatedOrderData;
// };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_ORDER":
      // console.log(updatedOrderData[0].id);
      let updatedOrderData = state.orderData.concat({
        title: action.orderData.title,
        price: action.orderData.price,
        updatedPrice: action.orderData.price,
        typeOfOrder: action.orderData.typeOfOrder,
        id: action.orderData.id,
        numOfOrders: 0
      });

      // localStorage.setItem("orderData", JSON.stringify(updatedOrderData));
      localStorage.setItem("counter", Number(state.counter + 1));

      // let currentObjectReg = getCurrentObj(state, action.orderData.id);
      // updatedOrderData = groupDuplicatedOrders(
      //   updatedOrderData,
      //   currentObjectReg,
      //   action.orderData.id
      // );

      return {
        ...state,
        counter: state.counter + 1,
        orderData: updatedOrderData,
        messageSent: false
      };
    case "UPDATE_NUM_ORDERS":
      let copy = [...state.orderData];
      let currObj = action.orderData;
      // if (
      //   copy.filter(
      //     movie =>
      //       movie.title === currObj.title &&
      //       movie.typeOfOrder === currObj.typeOfOrder
      //   )
      // ) {
      //   currObj.numOfOrders += 1;
      // }

      for (let i = 0; i < copy.length; i++) {
        const movie = copy[i];
        if (
          movie.title === currObj.title &&
          movie.typeOfOrder === currObj.typeOfOrder
        ) {
          currObj.numOfOrders += 1;
          movie.numOfOrders += 1;
          movie.updatedPrice = movie.numOfOrders * movie.price;
        }
      }
      // currObj.updatedPrice = currObj.numOfOrders * currObj.price;

      // updatedOrderData[id] = currObj;

      copy = copy.reduce((uniqueArr, object) => {
        if (
          !uniqueArr.some(
            obj =>
              obj.title === object.title &&
              obj.typeOfOrder === object.typeOfOrder
          )
        ) {
          uniqueArr.push(object);
        }
        return uniqueArr;
      }, []);

      localStorage.setItem("orderData", JSON.stringify(copy));

      return {
        ...state,
        orderData: copy
      };
    case "SUM_PRICE":
      localStorage.setItem("finalPrice", sumOrderPrice(state));
      return {
        ...state,
        finalPrice: sumOrderPrice(state)
      };

    case "CART_INCREMENT":
      let copyOrderDataInc = [...state.orderData];
      let currentObjectInc = getCurrentObj(state, action.id);
      currentObjectInc.updatedPrice += currentObjectInc.price;
      currentObjectInc.numOfOrders += 1;
      copyOrderDataInc[action.id] = currentObjectInc;

      localStorage.setItem("counter", Number(state.counter + 1));
      localStorage.setItem("orderData", JSON.stringify(copyOrderDataInc));

      return {
        ...state,
        counter: state.counter + 1,
        orderData: copyOrderDataInc
      };

    case "CART_DECREMENT":
      let copyOrderDataDec = [...state.orderData];
      let currentObjectDec = getCurrentObj(state, action.id);
      currentObjectDec.updatedPrice -= currentObjectDec.price;
      currentObjectDec.numOfOrders -= 1;
      copyOrderDataDec[action.id] = currentObjectDec;

      localStorage.setItem("counter", Number(state.counter - 1));
      localStorage.setItem("orderData", JSON.stringify(copyOrderDataDec));

      return {
        ...state,
        counter: state.counter - 1,
        orderData: copyOrderDataDec
      };
    case "CHECKOUT_START":
      return {
        ...state,
        loading: true
      };
    case "CHECKOUT_SENT":
      // localStorage.setItem("orderData", []);
      return {
        ...state,
        loading: false,
        messageSent: true,
        orderData: [],
        counter: 0
      };
    case "CHECKOUT_FAIL":
      return {
        ...state,
        error: action.error
      };
    case "DELETE_CARTITEM":
      let currentObjectDel = getCurrentObj(state, action.id);
      let itemCounter = currentObjectDel.updatedPrice / currentObjectDel.price;

      localStorage.setItem("counter", Number(state.counter - itemCounter));

      return {
        ...state,
        orderData: state.orderData.filter(delItem => delItem.id !== action.id),
        counter: state.counter - itemCounter
      };
    case "ORDER_LOGOUT":
      return {
        ...state,
        orderData: [],
        finalPrice: 0,
        counter: 0
      };
    case "CHECK_LOGIN_ORDERDATA":
      let token = localStorage.getItem("token");
      let orderData = localStorage.getItem("orderData");

      if (token) {
        if (orderData) {
          return {
            ...state,
            orderData: JSON.parse(localStorage.getItem("orderData")),
            finalPrice: localStorage.getItem("finalPrice"),
            counter: Number(localStorage.getItem("counter"))
          };
        }
      } else {
        return {
          ...state,
          orderData: [],
          finalPrice: 0,
          counter: 0
        };
      }
  }
  return state;
};

export default reducer;
