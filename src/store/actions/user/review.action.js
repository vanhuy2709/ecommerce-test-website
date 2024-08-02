import {
  HANDLE_OPEN_RATING_PRODUCT,
  HANDLE_CLOSE_RATING_PRODUCT,

  HANDLE_CHANGE_COMMENT_PRODUCT,
  HANDLE_CHANGE_RATING_PRODUCT
} from '../../constants/user/review.constant';

export const handleOpenRatingProductAction = (product) => {

  return {
    type: HANDLE_OPEN_RATING_PRODUCT,
    payload: product
  }
}

export const handleCloseRatingProductAction = () => {

  return {
    type: HANDLE_CLOSE_RATING_PRODUCT,
  }
}

export const handleChangeRatingProductAction = (value) => {

  return {
    type: HANDLE_CHANGE_RATING_PRODUCT,
    payload: value
  }
}
export const handleChangeCommentProductAction = (value) => {

  return {
    type: HANDLE_CHANGE_COMMENT_PRODUCT,
    payload: value
  }
}