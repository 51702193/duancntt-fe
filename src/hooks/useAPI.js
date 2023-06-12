import axios from "axios";

const useAPI = () => {
  const instance = axios.create({
    baseURL: "https://dacntt2-n092-be.netlify.app/.netlify/functions/api",
  });

  instance
    .get("/demo", {
      timeout: 5000,
    })
    .then(function (response) {
      // xử trí khi thành công
      console.log(response);
    })
    .catch(function (error) {
      // xử trí khi bị lỗi
      console.log(error);
    })
    .finally(function () {
      // luôn luôn được thực thi
    });
};

export default useAPI;
