import axios from "axios";
import { serviceUrl } from "./fixtures.js";

export const placemarkService = {
  placemarkUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.placemarkUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    try {
      const res = await axios.get(`${this.placemarkUrl}/api/users`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.placemarkUrl}/api/users`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.placemarkUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common.Authorization = "";
  },

  async createPlacemark(createdPlacemark) {
    const response = await axios.post(`${this.placemarkUrl}/api/placemarks`, createdPlacemark);
    return response.data;
  },

  async getPlacemarkById(id) {
    const response = await axios.get(`${this.placemarkUrl}/api/placemarks/${id}`);
    return response.data;
  },

  async getAllPlacemarks() {
    const response = await axios.get(`${this.placemarkUrl}/api/placemarks`);
    return response.data;
  },

  async deletePlacemarkById(id) {
    const response = await axios.delete(`${this.placemarkUrl}/api/placemarks/${id}`);
    return response.data;
  },

  async deleteAllPlacemarks() {
    const response = await axios.delete(`${this.placemarkUrl}/api/placemarks`);
    return response.data;
  },

  async callApi() {
    const response = await axios.get(`${this.placemarkUrl}/api/apitest`);
    return response.data;
  },
};
