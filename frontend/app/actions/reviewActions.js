import axios from 'axios';

import { PRODUCTION_URL } from '../config/production';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  CREATE_REVIEW_FOR_PLACE_FAIL,
  CREATE_REVIEW_FOR_PLACE_REQUEST,
  CREATE_REVIEW_FOR_PLACE_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DISLIKE_FAIL,
  DISLIKE_REQUEST,
  DISLIKE_SUCCESS,
  GET_FAVORITE_REVIEWS_FAIL,
  GET_FAVORITE_REVIEWS_REQUEST,
  GET_FAVORITE_REVIEWS_SUCCESS,
  GET_REVIEWS_BY_PLACE_FAIL,
  GET_REVIEWS_BY_PLACE_REQUEST,
  GET_REVIEWS_BY_PLACE_SUCCESS,
  GET_REVIEWS_BY_USER_FAIL,
  GET_REVIEWS_BY_USER_REQUEST,
  GET_REVIEWS_BY_USER_SUCCESS,
  GET_REVIEW_BY_ID_FAIL,
  GET_REVIEW_BY_ID_REQUEST,
  GET_REVIEW_BY_ID_SUCCESS,
  LIKE_FAIL,
  LIKE_REQUEST,
  LIKE_SUCCESS
} from '../constants/reviewConstants';

const BASE_URL = PRODUCTION_URL;

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getReviewsByPlace =
  (id, pageNo, pageSize) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_REVIEWS_BY_PLACE_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get(
        `${BASE_URL}/api/places/${id}/reviews`,
        config
      );

      dispatch({
        type: GET_REVIEWS_BY_PLACE_SUCCESS,
        payload: data
      });

      storeData('reviewsByPlaceData', data);
    } catch (error) {
      dispatch({
        type: GET_REVIEWS_BY_PLACE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
      console.log(error);
    }
  };

export const getReviewsByUser =
  (pageNo, pageSize) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_REVIEWS_BY_USER_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get(
        `${BASE_URL}/api/reviews/user/all`,
        config
      );

      dispatch({
        type: GET_REVIEWS_BY_USER_SUCCESS,
        payload: data
      });

      storeData('reviewsByUserData', data);
    } catch (error) {
      dispatch({
        type: GET_REVIEWS_BY_USER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
      console.log(error);
    }
  };

export const getReviewsByID =
  (id, pageNo, pageSize) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_REVIEW_BY_ID_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get(`${BASE_URL}/api/reviews/${id}`, config);

      dispatch({
        type: GET_REVIEW_BY_ID_SUCCESS,
        payload: data
      });

      storeData('reviewsByID', data);
    } catch (error) {
      dispatch({
        type: GET_REVIEW_BY_ID_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
      console.log(error);
    }
  };
export const getFavoritReviews =
  (pageNo, pageSize) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_FAVORITE_REVIEWS_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get(
        `${BASE_URL}/api/likes/user/all`,
        config
      );

      dispatch({
        type: GET_FAVORITE_REVIEWS_SUCCESS,
        payload: data
      });

      storeData('favoriteReviews', data);
    } catch (error) {
      dispatch({
        type: GET_FAVORITE_REVIEWS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
      console.log(error);
    }
  };
export const createReviewByPlace =
  (id, reviewdata) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_REVIEW_FOR_PLACE_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      console.log(reviewdata);

      const { data } = await axios.post(
        `${BASE_URL}/api/places/${id}/reviews`,
        reviewdata,
        config
      );

      dispatch({
        type: CREATE_REVIEW_FOR_PLACE_SUCCESS,
        payload: data
      });

      // console.log(data);

      storeData('createReviewForPlace', data);
    } catch (error) {
      console.log(error);
      dispatch({
        type: CREATE_REVIEW_FOR_PLACE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };

export const deleteReview = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_REVIEW_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.delete(
      `${BASE_URL}/api/reviews/${id}`,
      config
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data
    });

    // console.log(data);

    storeData('deleteReviewData', data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const likeforReview = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIKE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(
      `${BASE_URL}/api/reviews/${id}/likes`,
      { withCredentials: true },
      config
    );

    dispatch({
      type: LIKE_SUCCESS,
      payload: data
    });

    storeData('like', data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: LIKE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
    // console.log(error);
  }
};

export const dislikeforReview = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DISLIKE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(
      `${BASE_URL}/api/reviews/${id}/dislikes`,
      { withCredentials: true },
      config
    );

    dispatch({
      type: DISLIKE_SUCCESS,
      payload: data
    });

    storeData('dislike', data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: DISLIKE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
    // console.log(error);
  }
};
