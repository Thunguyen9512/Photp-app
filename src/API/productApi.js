// api/productApi.js
import axios from "axios";
import axiosClient from "./axiosClient";

class ProductApi {
  getAll = (authorId) =>
    axiosClient({
      method: "get",
      url: `/photos?authorId=${authorId}`,
    });
  postData = (params) =>
    axiosClient({
      method: "post",
      url: "/photos",
      data: params,
    });
  putData = (id, params) =>
    axiosClient({
      method: "put",
      url: `/photos/${id}`,
      data: params,
    });
  deleteData = (id) => {
    axiosClient({
      method:"delete",
      url: `/photos/${id}`,
    })
  }
}
const productApi = new ProductApi();
export default productApi;
