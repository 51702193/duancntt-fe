import useFetch from "react-fetch-hook";

const useUser = () => {
  const authUserLocalStorage = JSON.parse(localStorage.getItem("auth"));
  var url = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${authUserLocalStorage?.access_token}`;
  const { isLoading: isLoadingFetchAuthUser, data: authUser } = useFetch(url);

  const isAdmin = authUser?.email === "51702193@student.tdtu.edu.vn";
  const userMail = authUser?.email;

  return { isLoadingFetchAuthUser, authUser, isAdmin, userMail };
};

export default useUser;
