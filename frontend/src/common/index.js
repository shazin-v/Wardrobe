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
};

export default SummaryApi;
