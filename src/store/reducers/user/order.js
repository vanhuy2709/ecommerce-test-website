import {

  // Handle Change info Order
  HANDLE_CHANGE_ADDRESS,
  HANDLE_CHANGE_CITY,
  HANDLE_CHANGE_COUNTRY,
  HANDLE_CHANGE_PHONE,
  HANDLE_CHANGE_NOTE,
  HANDLE_CHANGE_DISTRICT,
  HANDLE_CHANGE_PROVINCE,

  // Create Order
  CREATE_ORDER_ERROR,
  CREATE_ORDER_PENDING,
  CREATE_ORDER_SUCCESS,

  // Get Orders by UserID
  FETCH_ORDERS_BY_USER_ID_ERROR,
  FETCH_ORDERS_BY_USER_ID_PENDING,
  FETCH_ORDERS_BY_USER_ID_SUCCESS,

  // Get Order by ID
  FETCH_ORDER_BY_ID_ERROR,
  FETCH_ORDER_BY_ID_PENDING,
  FETCH_ORDER_BY_ID_SUCCESS,

  // Get all Order
  FETCH_ORDERS_ERROR,
  FETCH_ORDERS_PENDING,
  FETCH_ORDERS_SUCCESS
} from '../../constants/user/order.constant';

const initState = {

  // Info Order
  orderUser: {
    address: '',
    country: '',
    city: '',
    phone: '',
    note: '',
    province: '',
    district: '',
  },

  // Create Order
  createOrder: {
    pending: false,
    order: null,
    isError: false,
  },

  // Get Order by User ID
  orderByUserId: {
    pending: false,
    listOrderByUser: null,
    isError: false
  },

  // Get Order by ID
  orderById: {
    pending: false,
    order: null,
    isError: false,
  },

  // Get all Order
  listOrder: {
    pending: false,
    orders: null,
    isError: false
  },
}

const orderReducer = (state = initState, action) => {

  switch (action.type) {

    // Handle Change Information Order
    case HANDLE_CHANGE_ADDRESS:
      state.orderUser.address = action.payload;
      break;
    case HANDLE_CHANGE_CITY:
      state.orderUser.city = action.payload;
      break;
    case HANDLE_CHANGE_COUNTRY:
      state.orderUser.country = action.payload;
      break;
    case HANDLE_CHANGE_PHONE:
      state.orderUser.phone = action.payload;
      break;
    case HANDLE_CHANGE_NOTE:
      state.orderUser.note = action.payload;
      break;
    case HANDLE_CHANGE_PROVINCE:
      state.orderUser.province = action.payload;
      break;
    case HANDLE_CHANGE_DISTRICT:
      state.orderUser.district = action.payload;
      break;


    // Create Order
    case CREATE_ORDER_PENDING:
      state.createOrder.pending = true;
      break;
    case CREATE_ORDER_ERROR:
      state.createOrder.pending = false;
      state.createOrder.isError = true;
      break;
    case CREATE_ORDER_SUCCESS:
      state.createOrder.pending = false;
      state.createOrder.isError = false;
      state.createOrder.order = action.payload;
      break;

    // Get Orders by User ID
    case FETCH_ORDERS_BY_USER_ID_PENDING:
      state.orderByUserId.pending = true;
      break;
    case FETCH_ORDERS_BY_USER_ID_ERROR:
      state.orderByUserId.pending = false;
      state.orderByUserId.isError = true;
      break;
    case FETCH_ORDERS_BY_USER_ID_SUCCESS:
      state.orderByUserId.pending = false;
      state.orderByUserId.isError = false;
      state.orderByUserId.listOrderByUser = action.payload;
      break;

    // Get Order by ID
    case FETCH_ORDER_BY_ID_PENDING:
      state.orderById.pending = true;
      break;
    case FETCH_ORDER_BY_ID_ERROR:
      state.orderById.pending = false;
      state.orderById.isError = true;
      break;
    case FETCH_ORDER_BY_ID_SUCCESS:
      state.orderById.pending = false;
      state.orderById.isError = false;
      state.orderById.order = action.payload;
      break;

    // Get all Order
    case FETCH_ORDERS_PENDING:
      state.listOrder.pending = true;
      break;
    case FETCH_ORDERS_ERROR:
      state.listOrder.pending = false;
      state.listOrder.isError = true;
      break;
    case FETCH_ORDERS_SUCCESS:
      state.listOrder.pending = false;
      state.listOrder.isError = false;
      state.listOrder.orders = action.payload;
      break;

    default:
      break;
  }

  return { ...state };
}

export default orderReducer;