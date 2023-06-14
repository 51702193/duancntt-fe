import axios from "axios";
import { useState } from "react";

const useAPI = ({ url }) => {
  const [data, setData] = useState();

  const instance = axios.create({
    baseURL: "https://dacntt2-n092-be.netlify.app/.netlify/functions/api",
    // baseURL: "http://localhost:5000/.netlify/functions/api",
  });

  const onRequest = () => {
    instance
      .get(url, {
        timeout: 5000,
      })
      .then(function (response) {
        setData(response?.data);
      })
      .catch(function (error) {
        // xử trí khi bị lỗi
        console.log(error);
      })
      .finally(function () {
        // luôn luôn được thực thi
      });
  };

  return [data, onRequest];
};

export default useAPI;
