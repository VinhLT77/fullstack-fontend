import "../scss/Car-Bill-ADM.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { detailBill } from "../services/BillSevice";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import ModalAddProduct from "../forms/Modals-AddProduct";
import {
  deleteProductOnCart,
  getDetailOne,
} from "../services/DirectSaleSevice";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faClipboardList,
  faCartPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Null from "../forms/Null";
import ModalUpdateProductOnCart from "../forms/Modals-Update-Product-Cart";

const CartBillADM = (props) => {
  //Get IdHd on http
  const param = useParams();
  const idHdParam = param.id;

  //Detail Hd
  const [listHD, setlistHD] = useState([]);
  // const [listHD, setlistHD] = useState([]);

  const getDetailHD = useCallback(async () => {
    try {
      let getData = await detailBill(idHdParam);
      console.log("checkDaTa: ", getData);
      setlistHD(getData);
    } catch (error) {
      console.error("Error: ", error);
    }
  }, [idHdParam]);
  useEffect(() => {
    getDetailHD();
  }, [getDetailHD]);
  //Select Product On Cart
  const [DataCart, setDataCart] = useState([]);

  const selectDataCart = useCallback(async () => {
    try {
      console.log("Check Data Cart: ", idHdParam);
      let res = await getDetailOne(idHdParam);
      console.log("Check Data Cart: ", res);
      setDataCart(res);
    } catch (error) {
      console.error("Error: ", error);
    }
  }, [idHdParam]);
  useEffect(() => {
    selectDataCart();
  }, [selectDataCart]);
  //Add Product
  const [showModalsAdd, setShowModalAdd] = useState(false);
  const handleAddProduct = () => {
    setShowModalAdd(true);
  };
  const handleClose = () => {
    setShowModalAdd(false);
  };
  //Delete product on cart
  const handleDelete = async (item) => {
    await deleteProductOnCart(item.idHdct);
    selectDataCart();
    toast.success("Delete the product is successfully");
  };
  //Update classify on the cart
  const [showModalsUpdate, setShowModalsUpdate] = useState(false);
  const [itemUpdateClassify, setItemUpdateClassify] = useState({});
  const handleUpdateClassify = (item) => {
    setShowModalsUpdate(true);
    console.log("Check item: ", item);
    if (item.length < 0) {
      return null;
    } else {
      setItemUpdateClassify(item);
    }
  };
  const handleCloseUpdateClassify = () => {
    setShowModalsUpdate(false);
  };
  return (
    <>
      <p>Bill Code: {listHD.maHd}</p>
      <div className="class-add-product">
        <Button
          onClick={() => handleAddProduct()}
          className="button-checkout"
          variant="outline-success"
        >
          <FontAwesomeIcon icon={faCartPlus} size="lg" />
          Add Product
        </Button>{" "}
      </div>
      <div className="row customer-information">
        <h5>Cart</h5>
        <Table className="table-Cart" striped hover borderless>
          <thead>
            <tr>
              <th>
                <Form.Check aria-label="option 1" />
              </th>
              <th>Product</th>
              <th>Classify</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Function</th>
            </tr>
          </thead>
          <tbody>
            {DataCart && DataCart.length > 0 ? (
              DataCart.map((item, index) => {
                return (
                  <tr key={`hoaDonChiTiet-${index}`}>
                    <td>
                      <Form.Check aria-label="option 1" />
                    </td>
                    <td>{item.idCtsp.idSp.tenSp}</td>
                    <td>
                      <Button
                        onClick={() => handleUpdateClassify(item)}
                        size="sm"
                        variant="outline-dark"
                      >
                        Size: {item.idCtsp.idSize.tenSize} \ Color:{" "}
                        {item.idCtsp.idMs.tenMs}
                      </Button>
                    </td>

                    <td>{item.idCtsp.giaBan}</td>
                    <td>{item.soLuong}</td>
                    <td>{item.donGia}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(item)}
                        type="button"
                        className="btn btn-outline-danger"
                      >
                        <FontAwesomeIcon icon={faDeleteLeft} size="lg" />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <Null />
              </tr>
            )}
          </tbody>
        </Table>
        <div className="col-2">
          <Button variant="outline-danger">
            <FontAwesomeIcon icon={faTrashCan} size="sm" />
          </Button>
        </div>
        <h6 className="col-2">Subtotal = {listHD.thanhTien}</h6>
      </div>
      <div className="row customer-information">
        <div className="row">
          <div className="col-5">
            <h5>Customer Information</h5>
          </div>
          <div className="col-7 button-list-personal">
            <Button size="sm" variant="outline-info">
              <FontAwesomeIcon icon={faClipboardList} size="lg" />
              List Persional
            </Button>
          </div>
        </div>

        <Form>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Normal text" />
          <br />
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
          <Form.Label>Number Phone</Form.Label>
          <Form.Control type="text" placeholder="Normal text" />
          <br />
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Normal text" />
          <br />
        </Form>
      </div>
      <div className="class-checkout">
        <Button className="button-checkout" variant="dark">
          Checkout
        </Button>{" "}
      </div>
      {/* Add Modals */}
      <ModalAddProduct
        show={showModalsAdd}
        selectDataCart={selectDataCart}
        handleClose={handleClose}
      />
      <ModalUpdateProductOnCart
        show={showModalsUpdate}
        handleClose={handleCloseUpdateClassify}
        itemUpdateClassify={itemUpdateClassify}
      />
    </>
  );
};
export default CartBillADM;
