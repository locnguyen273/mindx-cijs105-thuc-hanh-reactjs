import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Input } from "antd";
import "./style.css";

const ListProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productDetail, setProductDetail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [formCreateProduct, setFormCreateProduct] = useState({
    title: "",
    description: "",
    price: null,
  });

  const getListProductService = async () => {
    try {
      setIsLoading(true);
      const result = await axios.get("https://fakestoreapi.com/products");
      if (result.data) {
        setProducts(result.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListProductService();
  }, []);

  const getDataProductDetail = async (productId) => {
    try {
      setIsLoading(false);
      const result = await axios.get(
        `https://fakestoreapi.com/products/${productId}`
      );
      if (productId && result.data) {
        setProductDetail(result.data);
        setIsModalOpen(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeFormCreate = (event) => {
    setFormCreateProduct((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCancelCreateProduct = () => {
    setIsModalCreateOpen(false);
  };

  const handleCreateNewProduct = async () => {
    const convertData = {
      title: formCreateProduct.title,
      description: formCreateProduct.description,
      price: Number(formCreateProduct.price),
    };
    try {
      const result = await axios.post(
        "https://fakestoreapi.com/products",
        convertData
      );
      if(result.data) {
        setFormCreateProduct({
          title: "",
          description: "",
          price: null,
        })
        setIsModalCreateOpen(false);
        getListProductService();
      }
    } catch (error) {
      console.log(error);
    }
    console.log(convertData);
  };

  return (
    <div className="main-screen">
      {isLoading ? (
        <p className="loading">Loading....</p>
      ) : (
        <div>
          <div className="row">
            <div>List Product</div>
            <Button onClick={() => setIsModalCreateOpen(true)}>
              Create New Product
            </Button>
          </div>
          <ol>
            {products?.map((product) => {
              return (
                <li key={product.id} className="row">
                  <p>{product.title}</p>
                  <Button
                    type="primary"
                    onClick={() => getDataProductDetail(product.id)}
                  >
                    View Detail
                  </Button>
                </li>
              );
            })}
          </ol>

          {productDetail && (
            <Modal
              title={productDetail.title}
              closable={{ "aria-label": "Custom Close Button" }}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>{productDetail.id}</p>
              <p>{productDetail.description}</p>
              <p>{productDetail.price}</p>
            </Modal>
          )}
          {isModalCreateOpen && (
            <Modal
              title="Create Product"
              closable={{ "aria-label": "Custom Close Button" }}
              open={isModalCreateOpen}
              onCancel={handleCancelCreateProduct}
              footer={
                <div className="row">
                  <Button onClick={handleCancelCreateProduct}>Cancel</Button>
                  <Button type="primary" onClick={handleCreateNewProduct}>
                    Save
                  </Button>
                </div>
              }
            >
              <Input
                type="text"
                placeholder="enter title..."
                name="title"
                value={formCreateProduct.title}
                onChange={handleChangeFormCreate}
              />
              <Input
                type="text"
                placeholder="enter description..."
                name="description"
                value={formCreateProduct.description}
                onChange={handleChangeFormCreate}
              />
              <Input
                type="number"
                placeholder="enter price..."
                name="price"
                value={formCreateProduct.price}
                onChange={handleChangeFormCreate}
              />
            </Modal>
          )}
        </div>
      )}
    </div>
  );
};

export default ListProduct;
