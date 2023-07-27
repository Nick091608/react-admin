import request from "@/util/axios";
import common from "@/util/common";

export const login = (data: any) => {
  return request({
    url: "/admin/user/login",
    data,
    method: "POST",
    headers: {
      token: common.encodeRSA(data.mobile, null),
    },
  });
};
