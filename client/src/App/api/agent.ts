import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:5000/api/";

const ResponseBody = (response: AxiosResponse) => response.data;

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.interceptors.response.use(
  async (response) => {
    await sleep();
    return response;
  },
  (error: AxiosError) => {
    var data = error.response?.data; // obj ไม่รู้ชนิด
    var json = JSON.stringify(data);
    var { title, status } = JSON.parse(json);

    switch (status) {
      case 400:
        toast(title);
        break;
      case 401:
        toast(title);
        break;
      case 404:
        toast(title);
        break;
      default:
        break;
    }
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(ResponseBody),
};
// catalog.list() เรียกใช้ได้เลย
const catalog = {
  list: () => requests.get("Products"),
  details: (id: number) => requests.get(`products/${id}`),
};

const TestError = {
  get400Error: () => requests.get("buggy/GetBadRequest"),
  get401Error: () => requests.get("buggy/GetUnAuthorized"),
  get404Error: () => requests.get("buggy/GetNotFound"),
};

const agent = {
  catalog,
  TestError,
};

export default agent;

// axios("http://localhost:5000/api/Products")
//   .then((response: any) => setProduct(response.data))
//   .catch((error) => console.log(error));
