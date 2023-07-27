import JSEncrypt from "jsencrypt";

export default {
  encodeRSA(word, keyStr) {
    //这个是公钥,有入参时用入参，没有入参用默认公钥
    keyStr = keyStr
      ? keyStr
      : "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCaEHxmfw8JpAJYDMuJdm+rSKLwLFwG8XPwwuj4tGPou0gaBtbU0zd4/yl2oxSCdNuPHgwnrGDPIgmU4gsM/X0/cdPjWtVe5yQG5fhgym+0BvsJad6XbDMW5F/DlE+H/cQUe3WpXM59CsB7G/26jomPUtLnz7fzwO0bBK8sBtQuzwIDAQAB";
    //创建对象
    const jsRsa = new JSEncrypt();
    //设置公钥
    jsRsa.setPublicKey(keyStr);
    //返回加密后结果
    return jsRsa.encrypt(word);
  },
};
