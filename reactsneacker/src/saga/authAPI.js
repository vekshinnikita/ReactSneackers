import axios from "axios";
import {API_URL} from "../env"
import HeaderAuth from "../services/HeaderAuth";

export const loginAPI = (email, password) => {
    return axios
      .post(API_URL + "/auth/token/login/", { email, password })
      .then(response => response.data)
    }

export const logoutAPI = (token) => {
  return axios
    .post(API_URL + "/auth/token/logout/", {}, { headers: HeaderAuth(token)})
    .then(response => response.data)
  }

export const signupAPI = (last_name, first_name, email, password) => {
  return axios
    .post(API_URL + "/auth/users/", {last_name, first_name, email, password})
    .then(response => response.data)
  }

export const getUserAPI = (token) => {
  return axios
    .get(API_URL + "/auth/users/me/",{ headers: HeaderAuth(token)})
    .then(response => response.data)

  }

export const updateUserAPI = (data, token) => {
  return axios
    .post(API_URL + "/auth/update/user/", data, { headers: HeaderAuth(token)})
    .then(response => response.data)
    
  }

export const resetPasswordAPI = (email) => {
  return axios
    .post(API_URL + "/auth/users/reset_password/", {email})
    .then(response => response.data)
    
  }

export const confirmPasswordAPI = (new_password,uid,token) => {
  return axios
    .post(API_URL + "/auth/users/reset_password_confirm/", {new_password, uid, token})
    .then(response => response.data)
    
  }

export const  activateUserAPI = (token, uid) => {
  return axios
    .post(API_URL + "/auth/users/activation/", { uid, token})
    .then(response => response.data)
  }
 
