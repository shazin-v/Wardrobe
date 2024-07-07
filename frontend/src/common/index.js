const backendURL = "http://localhost:8080";

const SummaryApi = {
  signUP: {
    url: `${backendURL}/api/signup`,
    method: "POST",
  },
  login: {
    url: `${backendURL}/api/login`,
    method: "POST",
  },
  current_user: {
    url: `${backendURL}/api/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${backendURL}/api/userLogout`,
    method: "get",
  },
};

export default SummaryApi;
