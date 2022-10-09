import axios from 'axios';

import { PRODUCTION_URL } from '../config/production';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CREATE_PLACE_FAIL,
  CREATE_PLACE_REQUEST,
  CREATE_PLACE_SUCCESS,
  GET_ALL_PLACES_FAIL,
  GET_ALL_PLACES_REQUEST,
  GET_ALL_PLACES_SUCCESS
} from '../constants/placeConstants';

const BASE_URL = PRODUCTION_URL;

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getAllPlacesAction =
  (pageNo, pageSize) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_ALL_PLACES_REQUEST
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

      const { data } = await axios.get(`${BASE_URL}/api/places`, config);

      dispatch({
        type: GET_ALL_PLACES_SUCCESS,
        payload: data
      });

      storeData('allPlacesData', data);
    } catch (error) {
      dispatch({
        type: GET_ALL_PLACES_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
      console.log(error.response.data.message);
    }
  };

export const createPlaceAction = (placedata) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_PLACE_REQUEST
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
      `${BASE_URL}/api/places`,
      placedata,
      config
    );

    dispatch({
      type: CREATE_PLACE_SUCCESS,
      payload: data
    });

    // console.log(data);

    storeData('createPlace', data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: CREATE_PLACE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
