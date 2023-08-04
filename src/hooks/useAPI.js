import axios from "axios";
import { useState } from "react";

const useAPI = ({ url, method }) => {
  const [data, setData] = useState({ isLoading: false });

  const instance = axios.create({
    baseURL: "https://dacntt2-n092-be.netlify.app/.netlify/functions/api",
    // baseURL: "http://localhost:5000/.netlify/functions/api",
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

  const onGetRequest = () => {
    instance
      .get(url, {
        // timeout: 5000,
      })
      .then(function (response) {
        // console.log(response);
        setData({ data: response?.data, isLoading: false });
      })
      .catch(function (error) {
        setData({ data: null, isLoading: false, error });
      });
    // .finally(function () {
    //   // luôn luôn được thực thi
    // });
  };

  const onPostRequest = ({ data, callback }) => {
    console.log("🚀 ~ file: useAPI.js:44 ~ onPostRequest ~ data:", data);
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
