import axios from "axios";
import { useState } from "react";

import configs from "../configs";

const useAPI = ({ url, method }) => {
  const [data, setData] = useState({ isLoading: false });

  const instance = axios.create({
    baseURL:
      configs.MODE === "production"
        ? "https://dacntt2-n092-be.netlify.app/.netlify/functions/api"
        : "http://localhost:5000/.netlify/functions/api",
  });

  instance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      setData({ isLoading: true });
      return config;
    },
    function (error) {
      // Do something with request error
      setData({ isLoading: false });
      // return Promise.reject(error);
    }
  );

  const onGetRequest = (params) => {
    const { data } = params || {};
    instance
      .get(url, {
        params: data,
      })
      .then(function (response) {
        setData({ data: response?.data, isLoading: false });
      })
      .catch(function (error) {
        setData({ data: null, isLoading: false, error });
      });
  };

  const onPostRequest = ({ data, callback }) => {
    instance
      .post(url, {
        data,
      })
      .then(function (response) {
        if (callback) {
          callback();
        }
        setData({ data: response?.data, isLoading: false });
      });
  };

  const onRequest = method === "post" ? onPostRequest : onGetRequest;

  return [data, onRequest];
};

export default useAPI;
