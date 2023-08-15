import { toast } from "react-toastify";
import useAPI from "./useAPI";
// import { useNavigate } from "react-router-dom";

const useTinTuc = () => {
  //   const navigate = useNavigate();
  const [
    { isLoading: isLoadingUpdateTinTuc, data: formDataResponse = {} },
    onPostFormData,
  ] = useAPI({
    url: "/update-tin-tuc",
    method: "post",
  });

  const updateTinTuc = ({ status, id }) => {
    onPostFormData({
      data: { status, _id: id },
      callback: () => {
        // navigate(`/duan/${id}`, { replace: true });
        window.location.replace(`/duan/${id}`);
        toast.success("Duyệt tin tức thành công", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      },
    });
  };

  return { updateTinTuc, isLoadingUpdateTinTuc };
};

export default useTinTuc;
