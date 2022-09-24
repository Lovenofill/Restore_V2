import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { history } from "../..";

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true; //อนุญำตให้เข้ำถึงคุกกี้ที่ browser ได

const ResponseBody = (response: AxiosResponse) => response.data;

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

axios.interceptors.response.use(
  async (response) => {
    await sleep();
    return response;
  },
  (error: AxiosError) => {
    var data = error.response?.data; // obj ไม่รู้ชนิด
    var json = JSON.stringify(data);
    var result = JSON.parse(json);

    switch (result.status) {
      case 400:
        //ตรวจสอบค่าที่ส่งมาจาก GetValidationError()
        if (result.errors) {
          const modelStateErrors: string[] = [];
          for (const key in result.errors) {
            if (result.errors[key]) {
              modelStateErrors.push(result.errors[key]);
            }
          }
          console.log(modelStateErrors);
          throw modelStateErrors.flat();
        }
        toast.error(result.title);
        break;
      case 401:
        toast.error(result.title);
        break;
      case 404:
        toast.error(result.title);
        break;
      case 500:
        history.push("/server-error", { state: data });
        toast.error(result.title);
        break;
      default:
        break;
    }
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(ResponseBody),
  post: (url: string, body?: {}) => axios.post(url, body).then(ResponseBody),
  delete: (url: string) => axios.delete(url).then(ResponseBody),
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
  get500Error: () => requests.get("buggy/GetServerError"),
  getValidationError: () => requests.get("buggy/GetValidationError"),
};
const Basket = {
  get: () => requests.get("Basket"),
  addItem: (productId: number, quantity = 1) =>requests.post(`basket?productId=${productId}&quantity=${quantity}`),
  removeItem: (productId: number, quantity = 1) =>requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
};
const agent = {
  catalog,
  TestError,
  Basket,
};

export default agent;

// axios("http://localhost:5000/api/Products")
//   .then((response: any) => setProduct(response.data))
//   .catch((error) => console.log(error));
