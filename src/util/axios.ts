import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
// import { useUserStore } from "@/stores/user";
// import router from "@/router";
import { message } from "antd";

// const userStore = useUserStore();

const service = axios.create({
  method: "GET",
  baseURL: "/api", //.env中的VITE_APP_API参数
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  timeout: 10000, //超时时间
});

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    // config.headers["token"] = "";
    return config;
  },
  (error) => {
    console.log(error);
  }
);

service.interceptors.response.use(
  (res: AxiosResponse<any, any>) => {
    const { data } = res;
    if (data.status != 200) {
      message.error(data.msg);
      // 登录过期 重定向到 登录
      // if (data.code === 403) {
      //   userStore.setToken(""); // 清空 token
      //   router.replace({
      //     path: "/login",
      //   })
      // }
      return Promise.reject(data);
    }
    return data;
  },
  (error) => {
    message.error(error.message);
    // 登录过期 重定向到 登录
    // if (error.response.data?.code === 403) {
    //   userStore.setToken(""); // 清空 token
    //   router.replace({
    //     path: "/login",
    //   })
    // }
    return Promise.reject(error);
  }
);

export default service;
