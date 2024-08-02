import {
  HANDLE_CLOSE_RATING_PRODUCT,
  HANDLE_OPEN_RATING_PRODUCT,

  HANDLE_CHANGE_COMMENT_PRODUCT,
  HANDLE_CHANGE_RATING_PRODUCT
} from '../../constants/user/review.constant';

import {
  CREATE_COMMENT_ERROR,
  CREATE_COMMENT_PENDING,
  CREATE_COMMENT_SUCCESS
} from '../../constants/user/comment.constant';

const initState = {

  reviewModal: {
    open: false,
    comment: '',
    productId: '',
    rating: 0
  },

}

const reviewReducer = (state = initState, action) => {

  switch (action.type) {
    case HANDLE_OPEN_RATING_PRODUCT:
      state.reviewModal.open = true;
      state.reviewModal.productId = action.payload;
      break;

    case HANDLE_CLOSE_RATING_PRODUCT:
      state.reviewModal.open = false;
      state.reviewModal.rating = '';
      state.reviewModal.comment = '';
      break;


    case HANDLE_CHANGE_RATING_PRODUCT:
      state.reviewModal.rating = action.payload;
      break;
    case HANDLE_CHANGE_COMMENT_PRODUCT:
      state.reviewModal.comment = action.payload;
      break;


    case CREATE_COMMENT_PENDING:
      break;
    case CREATE_COMMENT_ERROR:
      break;
    case CREATE_COMMENT_SUCCESS:
      state.reviewModal.open = false;
      state.reviewModal.rating = '';
      state.reviewModal.comment = '';
      break;

    default:
      break;
  }

  return { ...state };
}

export default reviewReducer;