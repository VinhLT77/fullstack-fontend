import custom from "./custom-axios";
const chucVu = (page) => {
  return custom.get(`/chuc-vu/view-all?p=${page}`); // Call API
};
const postAddChucVu = (maCv, tenCv, ngayTao, trangThai) => {
  return custom.post("/chuc-vu/add", { maCv, tenCv, ngayTao ,trangThai});
};
const deleteChucVu = (id) => {
  return custom.delete(`/chuc-vu/delete/${id}`);
};
export { chucVu, postAddChucVu, deleteChucVu };
