import {
  CREATE_REVIEW_FOR_PLACE_FAIL,
  CREATE_REVIEW_FOR_PLACE_REQUEST,
  CREATE_REVIEW_FOR_PLACE_RESET,
  CREATE_REVIEW_FOR_PLACE_SUCCESS,
  GET_REVIEWS_BY_PLACE_FAIL,
  GET_REVIEWS_BY_PLACE_REQUEST,
  GET_REVIEWS_BY_PLACE_RESET,
  GET_REVIEWS_BY_PLACE_SUCCESS
} from '../constants/reviewConstants';

export const getReviewsByPlaceReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_REVIEWS_BY_PLACE_REQUEST:
      return { loading: true, success: false };
    case GET_REVIEWS_BY_PLACE_SUCCESS:
      return { loading: false, success: true, reviewsByPlace: action.payload };
    case GET_REVIEWS_BY_PLACE_FAIL:
      return { loading: false, error: action.payload };
    case GET_REVIEWS_BY_PLACE_RESET:
      return {};
    default:
      return state;
  }
};
export const createReviewForPlaceReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_REVIEW_FOR_PLACE_REQUEST:
      return { loading: true, success: false };
    case CREATE_REVIEW_FOR_PLACE_SUCCESS:
      return {
        loading: false,
        success: true,
        createReviewForPlace: action.payload
      };
    case CREATE_REVIEW_FOR_PLACE_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_REVIEW_FOR_PLACE_RESET:
      return {};
    default:
      return state;
  }
};
