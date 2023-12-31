import custom from "./custom-axios";
const getDetailOne = (idHd) => {
  return custom.get(`/hoa-don-chi-tiet/detail-get-one/${idHd}`);
};
const getDataCart = (idHd) => {
  return custom.get(`/hoa-don-chi-tiet/detail/${idHd}`);
};
const postAddDirect = (idCtsp, soLuong, donGia, idHd, postAddDirect) => {
  return custom.post("/hoa-don-chi-tiet/add", {
    idCtsp,
    soLuong,
    donGia,
    idHd,
  });
};
const addProduct = (idCtsp, soLuong, donGia, idHd) => {
  return custom.put(`/hoa-don-chi-tiet/update-cart/${idHd}`, {
    idCtsp,
    soLuong,
    donGia,
  });
};
const deleteProductOnCart = (idHdct) => {
  return custom.delete(`/hoa-don-chi-tiet/delete/${idHdct}`);
};
export {
  addProduct,
  getDataCart,
  postAddDirect,
  getDetailOne,
  deleteProductOnCart,
};
