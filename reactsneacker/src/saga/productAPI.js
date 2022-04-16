import axios from "axios";
import {API_URL} from "../env"
import HeaderAuth from "../services/HeaderAuth";
import { filterParams } from "../services/service";

export const listProductsAPI = (filter, page) => {
    return axios
      .get(API_URL + "/v1/products/" + filterParams(filter,page))
      .then(response => [response.data.result, response.data.page_quantity])
    }
  
export const detailProductsAPI = (id) => {
  return axios
    .get(API_URL + `/v1/products/${id}/`)
    .then(response => response.data)
}

export const leaveReviewAPI = (productID, text, rating_value, token) => {
return axios
  .post(API_URL + `/v1/products/${productID}/review/`,{text,rating_value}, { headers: HeaderAuth(token)})
  .then(response => response.data)
}

export const getFilterFieldsAPI = () => {
  return axios
    .get(API_URL + `/v1/filter/fields/`)
    .then(response => response.data)
  }


export const getOrdersAPI = (token) => {
  return axios
    .get(API_URL + `/v1/orders/`, {headers: HeaderAuth(token)})
    .then(response => response.data)
}

export const makeOrderAPI = (order,token) => {
  return axios
    .post(API_URL + `/v1/orders/`, {ids_product: order} , { headers: HeaderAuth(token)})
    .then(response => response.data.id)
}
