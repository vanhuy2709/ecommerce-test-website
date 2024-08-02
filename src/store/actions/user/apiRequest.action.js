import axios from 'axios';
import { notification } from 'antd'

// Import Constant
import {
  FETCH_CATEGORIES_ERROR,
  FETCH_CATEGORIES_PENDING,
  FETCH_CATEGORIES_SUCCESS
} from '../../constants/user/category.constant';
import {
  // Get all Product is Featured
  FETCH_PRODUCTS_FEATURED_ERROR,
  FETCH_PRODUCTS_FEATURED_PENDING,
  FETCH_PRODUCTS_FEATURED_SUCCESS,

  // Get all Product
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_PENDING,
  FETCH_PRODUCTS_SUCCESS,

  // Fetch Filter Product
  FETCH_FILTER_PRODUCTS_ERROR,
  FETCH_FILTER_PRODUCTS_PENDING,
  FETCH_FILTER_PRODUCTS_SUCCESS,

  // Fetch Product by ID
  FETCH_PRODUCT_BY_ID_ERROR,
  FETCH_PRODUCT_BY_ID_PENDING,
  FETCH_PRODUCT_BY_ID_SUCCESS
} from '../../constants/user/product.constant';
import {
  FETCH_PRODUCT_MAX_PRICE_ERROR,
  FETCH_PRODUCT_MAX_PRICE_PENDING,
  FETCH_PRODUCT_MAX_PRICE_SUCCESS
} from '../../constants/user/price.constant';
import {
  // Fetch User Login
  FETCH_USER_LOGIN_ERROR,
  FETCH_USER_LOGIN_PENDING,
  FETCH_USER_LOGIN_SUCCESS,

  // Fetch User Register
  FETCH_USER_REGISTER_ERROR,
  FETCH_USER_REGISTER_PENDING,
  FETCH_USER_REGISTER_SUCCESS
} from '../../constants/user/auth.constant';
import {
  // Create Order
  CREATE_ORDER_ERROR,
  CREATE_ORDER_PENDING,
  CREATE_ORDER_SUCCESS,

  // Get Orders by User ID
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
  FETCH_ORDERS_SUCCESS,

  // Delete Order by ID
  DELETE_ORDER_BY_ID_ERROR,
  DELETE_ORDER_BY_ID_PENDING,
  DELETE_ORDER_BY_ID_SUCCESS,
} from '../../constants/user/order.constant';
import {
  // Update User by ID
  UPDATE_USER_BY_ID_ERROR,
  UPDATE_USER_BY_ID_PENDING,
  UPDATE_USER_BY_ID_SUCCESS,

  // Get User by ID
  FETCH_USER_BY_ID_ERROR,
  FETCH_USER_BY_ID_PENDING,
  FETCH_USER_BY_ID_SUCCESS,

  // Update Password User by ID
  UPDATE_PASSWORD_USER_BY_ID_ERROR,
  UPDATE_PASSWORD_USER_BY_ID_PENDING,
  UPDATE_PASSWORD_USER_BY_ID_SUCCESS,
} from '../../constants/user/user.constant';
import {
  // Fetch List Comment User
  FETCH_COMMENTS_PRODUCT_BY_ID_ERROR,
  FETCH_COMMENTS_PRODUCT_BY_ID_PENDING,
  FETCH_COMMENTS_PRODUCT_BY_ID_SUCCESS,

  // Create Comment
  CREATE_COMMENT_ERROR,
  CREATE_COMMENT_PENDING,
  CREATE_COMMENT_SUCCESS,

  // Delete Comment by ID
  DELETE_COMMENT_ERROR,
  DELETE_COMMENT_PENDING,
  DELETE_COMMENT_SUCCESS,

  // Update Comment by ID
  UPDATE_COMMENT_ERROR,
  UPDATE_COMMENT_PENDING,
  UPDATE_COMMENT_SUCCESS
} from '../../constants/user/comment.constant';
import {
  // Fetch List Provinces
  FETCH_PROVINCES_ERROR,
  FETCH_PROVINCES_PENDING,
  FETCH_PROVINCES_SUCCESS,

  // Fetch Districts by Province ID
  FETCH_DISTRICT_BY_PROVINCE_ID_ERROR,
  FETCH_DISTRICT_BY_PROVINCE_ID_PENDING,
  FETCH_DISTRICT_BY_PROVINCE_ID_SUCCESS,
} from '../../constants/user/province.constant';

// URL Link
const API_URL_CATEGORY = 'http://localhost:8080/api/categories';
const API_URL_PRODUCT = 'http://localhost:8080/api/products';
const API_URL_AUTH = 'http://localhost:8080/api/auth';
const API_URL_ORDER = 'http://localhost:8080/api/orders';
const API_URL_USER = 'http://localhost:8080/api/users';
const API_URL_COMMENT = 'http://localhost:8080/api/comments';
const API_URL_PROVINCE = 'https://vapi.vnappmob.com/api/province';
const API_URL_DISTRICT = 'https://vapi.vnappmob.com/api/province/district';

// Api Request Function
// Get all Category
export const getAllCategoryAction = () => {
  return async (dispatch) => {
    try {

      // Pending
      await dispatch({
        type: FETCH_CATEGORIES_PENDING
      })

      // Success
      let response = await axios.get(API_URL_CATEGORY);
      return dispatch({
        type: FETCH_CATEGORIES_SUCCESS,
        payload: response.data
      })

    } catch (error) {

      // Error
      return dispatch({
        type: FETCH_CATEGORIES_ERROR,
        error
      })
    }
  }
}

// Get all Product is Featured
export const getAllProductFeaturedAction = () => {
  return async (dispatch) => {
    try {

      // Pending
      await dispatch({
        type: FETCH_PRODUCTS_FEATURED_PENDING
      })

      // Success
      let response = await axios.get(API_URL_PRODUCT + '/' + 'featured');
      return dispatch({
        type: FETCH_PRODUCTS_FEATURED_SUCCESS,
        payload: response.data
      })

    } catch (error) {

      // Error
      return dispatch({
        type: FETCH_PRODUCTS_FEATURED_ERROR,
        error
      })
    }
  }
}

// Get all Product
export const getAllProduct = (page, limit, categoryListChecked, minPrice, maxPrice, checkedRating, valueSearch, sortValue) => {
  return async (dispatch) => {

    try {

      // Pending
      await dispatch({
        type: FETCH_PRODUCTS_PENDING
      })

      // Success

      if (page && limit) {

        // Pagination
        // const params = new URLSearchParams({
        //   page,
        //   limit
        // })

        const param = new URLSearchParams({
          categories: categoryListChecked.length < 0 ? null : categoryListChecked,
          minPrice,
          // maxPrice: maxPrice === 0 ? 1500 : maxPrice,
          maxPrice,
          rating: checkedRating,
          search: valueSearch,
          sortPrice: sortValue,
          page,
          limit
        })
        const paramUrl = param.toString().replace("%2C", ",");

        // let response = await axios.get(API_URL_PRODUCT + "?" + params.toString());
        let response = await axios.get(API_URL_PRODUCT + "?" + paramUrl.toString());
        return dispatch({
          type: FETCH_PRODUCTS_SUCCESS,
          payload: response.data
        })

      } else {

        let response = await axios.get(API_URL_PRODUCT);
        return dispatch({
          type: FETCH_PRODUCTS_SUCCESS,
          payload: response.data
        })
      }


    } catch (error) {

      // Error
      return dispatch({
        type: FETCH_PRODUCTS_ERROR,
        error
      })
    }
  }
}

// Get Product Max Price
export const getProductMaxPriceAction = () => {

  return async (dispatch) => {

    try {

      // Pending
      await dispatch({
        type: FETCH_PRODUCT_MAX_PRICE_PENDING
      })

      // Success
      let response = await axios.get(API_URL_PRODUCT + '/get/maxPrice');
      return dispatch({
        type: FETCH_PRODUCT_MAX_PRICE_SUCCESS,
        payload: response.data
      })

    } catch (error) {

      // Error
      return dispatch({
        type: FETCH_PRODUCT_MAX_PRICE_ERROR,
        error
      })
    }
  }
}

// Get Filter Products
export const getAllProductFilterAction = (params) => {

  return async (dispatch) => {

    try {

      // Pending
      await dispatch({
        type: FETCH_FILTER_PRODUCTS_PENDING
      })

      // Success
      if (params) {
        let response = await axios.get(API_URL_PRODUCT + "?" + params);
        return dispatch({
          type: FETCH_FILTER_PRODUCTS_SUCCESS,
          payload: response.data
        })

      } else {
        let response = await axios.get(API_URL_PRODUCT);
        return dispatch({
          type: FETCH_FILTER_PRODUCTS_SUCCESS,
          payload: response.data
        })
      }


    } catch (error) {

      // Error
      return dispatch({
        type: FETCH_FILTER_PRODUCTS_ERROR,
        error
      })
    }
  }

}

// Get Product by ID
export const getProductByIdAction = (id) => {

  return async (dispatch) => {

    try {
      // Pending
      await dispatch({
        type: FETCH_PRODUCT_BY_ID_PENDING
      })

      // Success
      let response = await axios.get(API_URL_PRODUCT + "/" + id);
      return dispatch({
        type: FETCH_PRODUCT_BY_ID_SUCCESS,
        payload: response.data
      })
    } catch (error) {

      // Error
      return dispatch({
        type: FETCH_PRODUCT_BY_ID_ERROR,
        error
      })
    }
  }
}

// Login User
export const loginUserAction = (user, navigate) => {

  return async (dispatch) => {

    try {

      // Pending
      await dispatch({
        type: FETCH_USER_LOGIN_PENDING
      })

      // Success
      const headers = {
        'Content-Type': 'application/json'
      }
      let response = await axios.post(API_URL_AUTH + '/login', user, { headers });

      notification.success({
        message: 'Success',
        description: 'Login Successfully'
      })

      // Navigate to HomePage
      navigate('/');
      sessionStorage.setItem('user', JSON.stringify(response.data));

      return dispatch({
        type: FETCH_USER_LOGIN_SUCCESS,
        payload: response.data
      })

    } catch (error) {
      // Error
      notification.error({
        message: 'Error',
        description: error.response.data
      })

      return dispatch({
        type: FETCH_USER_LOGIN_ERROR,
        error
      })
    }
  }
}

// Register User
export const registerUserAction = (user, navigate) => {

  return async (dispatch) => {

    try {

      // Pending
      await dispatch({
        type: FETCH_USER_REGISTER_PENDING
      })

      // Success
      const headers = {
        'Content-Type': 'application/json'
      }
      let response = await axios.post(API_URL_AUTH + '/register', user, { headers });

      // Show Alert
      notification.success({
        message: 'Success',
        description: 'Register Successfully'
      })

      // Navigate to Login Page
      navigate('/login');

      return dispatch({
        type: FETCH_USER_REGISTER_SUCCESS,
        payload: response.data
      })

    } catch (error) {

      // Error
      notification.error({
        message: 'Error',
        description: error.response.data
      })

      return dispatch({
        type: FETCH_USER_REGISTER_ERROR,
        error
      })
    }
  }
}

// Create Order
export const createOrderAction = (order, token, navigate) => {

  return async (dispatch) => {

    try {
      // Pending
      await dispatch({
        type: CREATE_ORDER_PENDING
      })

      // Success
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }

      let response = await axios.post(API_URL_ORDER, order, { headers });

      notification.success({
        message: 'Create Order Success'
      })

      localStorage.removeItem('listCart');

      navigate(`/checkout/result/${response.data._id}`);
      window.location.reload();

      return dispatch({
        type: CREATE_ORDER_SUCCESS,
        payload: response.data
      })

    } catch (error) {

      notification.error({
        message: 'Error',
        description: error.response.data
      })

      // Error
      return dispatch({
        type: CREATE_ORDER_ERROR,
        error
      })
    }
  }
}

// Get all Order
export const getAllOrderAction = () => {

  return async (dispatch) => {

    try {
      // Pending
      await dispatch({
        type: FETCH_ORDERS_PENDING,
      })

      // Success
      let response = await axios.get(API_URL_ORDER);
      return dispatch({
        type: FETCH_ORDERS_SUCCESS,
        payload: response.data
      })
    } catch (error) {
      // Error
      return dispatch({
        type: FETCH_ORDERS_ERROR,
        error
      })
    }
  }
}

// Get Orders by User ID
export const getOrdersByUserIdAction = (token, userId, params) => {

  return async (dispatch) => {

    try {
      // Pending
      await dispatch({
        type: FETCH_ORDERS_BY_USER_ID_PENDING
      })

      // Success

      // Pagination
      // const params = new URLSearchParams({
      //   page,
      //   limit
      // })
      const headers = {
        'Authorization': `Bearer ${token}`
      }
      let response = await axios.get(API_URL_ORDER + '/get/userorders/' + userId + "?" + params, { headers });
      return dispatch({
        type: FETCH_ORDERS_BY_USER_ID_SUCCESS,
        payload: response.data
      })

    } catch (error) {

      // Error
      return dispatch({
        type: FETCH_ORDERS_BY_USER_ID_ERROR,
        error
      })
    }
  }
}

// Get Order by ID
export const getOrderByIdAction = (id) => {

  return async (dispatch) => {

    try {
      // Pending
      await dispatch({
        type: FETCH_ORDER_BY_ID_PENDING,
      })

      // Success
      let response = await axios.get(API_URL_ORDER + "/" + id);
      return dispatch({
        type: FETCH_ORDER_BY_ID_SUCCESS,
        payload: response.data
      })

    } catch (error) {
      // Error
      return dispatch({
        type: FETCH_ORDER_BY_ID_ERROR,
        error
      })
    }
  }
}

// Delete Order by ID
export const deleteOrderByIdAction = (orderId, navigate) => {

  return async (dispatch) => {

    try {
      // Pending
      await dispatch({
        type: DELETE_ORDER_BY_ID_PENDING
      })

      // Success
      let response = await axios.delete(API_URL_ORDER + '/' + orderId);

      notification.success({
        message: 'Delete Order Success'
      })

      navigate('/account/order-history');

      return dispatch({
        type: DELETE_ORDER_BY_ID_SUCCESS,
        payload: response.data
      })
    } catch (error) {
      // Error
      notification.error({
        message: 'Error',
        description: error.response.data
      })

      return dispatch({
        type: DELETE_ORDER_BY_ID_ERROR,
        error
      })
    }
  }
}

// Get User by ID
export const getUserByIdAction = (id) => {

  return async (dispatch) => {

    try {
      // Pending
      await dispatch({
        type: FETCH_USER_BY_ID_PENDING
      })

      // Success
      let response = await axios.get(API_URL_USER + "/" + id);
      return dispatch({
        type: FETCH_USER_BY_ID_SUCCESS,
        payload: response.data
      })

    } catch (error) {

      // Error
      return dispatch({
        type: FETCH_USER_BY_ID_ERROR,
        error
      })
    }
  }
}

// Update User by ID
export const updateUserByIdAction = (id, newInfoUser, token) => {

  return async (dispatch) => {

    try {
      // Pending
      await dispatch({
        type: UPDATE_USER_BY_ID_PENDING
      })

      // Success
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }

      let response = await axios.put(API_URL_USER + '/' + id, newInfoUser, { headers });
      notification.success({
        message: 'Success',
        description: 'Change info user success'
      })
      return dispatch({
        type: UPDATE_USER_BY_ID_SUCCESS,
        payload: response.data
      })

    } catch (error) {

      // Error
      notification.error({
        message: 'Error',
        description: JSON.stringify(error.response.data)
      })

      return dispatch({
        type: UPDATE_USER_BY_ID_ERROR,
        error
      })
    }
  }
}

// Update Password by User ID
export const updatePasswordUserByIdAction = (id, newPasswordUser, token) => {

  return async (dispatch) => {

    try {
      // Pending
      await dispatch({
        type: UPDATE_PASSWORD_USER_BY_ID_PENDING
      })

      // Success
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }

      let response = await axios.put(API_URL_USER + '/change-password/' + id, newPasswordUser, { headers });
      notification.success({
        message: 'Success',
        description: 'Change password successfully'
      })

      return dispatch({
        type: UPDATE_PASSWORD_USER_BY_ID_SUCCESS,
        payload: response.data
      })

    } catch (error) {

      // Error
      notification.error({
        message: 'Error',
        description: error.response.data
      })

      return dispatch({
        type: UPDATE_PASSWORD_USER_BY_ID_ERROR,
        error
      })
    }
  }
}

// Get list Comment by Product ID
export const getCommentsByProductAction = (productId, page, limit) => {
  return async (dispatch) => {

    try {
      // Pending
      await dispatch({
        type: FETCH_COMMENTS_PRODUCT_BY_ID_PENDING
      })

      // Success
      const param = new URLSearchParams({
        page,
        limit
      })
      let response = await axios
        .get(API_URL_COMMENT + '/get-product/' + productId + "?" + param.toString());
      return dispatch({
        type: FETCH_COMMENTS_PRODUCT_BY_ID_SUCCESS,
        payload: response.data
      })
    } catch (error) {

      // Error
      return dispatch({
        type: FETCH_COMMENTS_PRODUCT_BY_ID_ERROR,
        error
      })
    }
  }
}

// Create Comment
export const createCommentAction = (newComment) => {

  return async (dispatch) => {

    try {
      // Pending
      await dispatch({
        type: CREATE_COMMENT_PENDING
      })

      // Success
      const headers = {
        'Content-Type': 'application/json'
      }
      let response = await axios.post(API_URL_COMMENT, newComment, { headers });

      // await dispatch(getCommentsByProductAction(newComment.product, page, limit));
      notification.success({
        message: 'Success'
      })

      return dispatch({
        type: CREATE_COMMENT_SUCCESS,
        payload: response.data
      })

    } catch (error) {

      // Error
      return dispatch({
        type: CREATE_COMMENT_ERROR,
        error
      })
    }

  }
}

// Delete Comment
export const deleteCommentByIdAction = (commentId, productId, page, limit) => {

  return async (dispatch) => {

    try {
      // Pending
      await dispatch({
        type: DELETE_COMMENT_PENDING
      })

      // Success
      let response = await axios.delete(API_URL_COMMENT + '/' + commentId);

      await dispatch(getCommentsByProductAction(productId, page, limit));

      notification.success({
        message: 'Delete Comment Success'
      })

      return dispatch({
        type: DELETE_COMMENT_SUCCESS,
        payload: response.data
      })


    } catch (error) {

      // Error
      return dispatch({
        type: DELETE_COMMENT_ERROR,
        error
      })
    }
  }
}

// Update Comment
export const updateCommentByIdAction = (commentId, newComment, productId, page, limit) => {

  return async (dispatch) => {

    try {
      // Pending
      await dispatch({
        type: UPDATE_COMMENT_PENDING
      })

      // Success
      const headers = {
        'Content-Type': 'application/json'
      }
      let response = await axios.put(API_URL_COMMENT + '/' + commentId, newComment, { headers });

      await dispatch(getCommentsByProductAction(productId, page, limit));

      return dispatch({
        type: UPDATE_COMMENT_SUCCESS,
        payload: response.data
      })
    } catch (error) {

      // Error
      return dispatch({
        type: UPDATE_COMMENT_ERROR,
        error
      })
    }
  }
}

// Fetch List Province
export const getAllProvincesAction = () => {

  return async (dispatch) => {

    try {
      // Pending
      await dispatch({
        type: FETCH_PROVINCES_PENDING
      })

      // Success
      let response = await axios.get(API_URL_PROVINCE);
      return dispatch({
        type: FETCH_PROVINCES_SUCCESS,
        payload: response.data
      })

    } catch (error) {
      // Error
      return dispatch({
        type: FETCH_PROVINCES_ERROR,
        error
      })
    }
  }
}

// Fetch District by Province ID
export const getAllDistrictByProvinceIdAction = (provinceId) => {

  return async (dispatch) => {

    try {
      // Pending
      await dispatch({
        type: FETCH_DISTRICT_BY_PROVINCE_ID_PENDING
      })

      // Success
      let response = await axios.get(API_URL_DISTRICT + '/' + provinceId);
      return dispatch({
        type: FETCH_DISTRICT_BY_PROVINCE_ID_SUCCESS,
        payload: response.data
      })

    } catch (error) {
      // Error
      return dispatch({
        type: FETCH_DISTRICT_BY_PROVINCE_ID_ERROR,
        error
      })
    }
  }
}