import request from "@/util/axios";
import common from "@/util/common";

// 查询订单信息
export const orderQuery = (data: any) => {
  return request({
    url: "/user/order/query",
    params: data,
    headers: {
      token: common.encodeRSA(data.mobile, null),
    },
  });
};
