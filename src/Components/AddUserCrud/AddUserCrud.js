import React, { useState, useEffect } from "react";
import "./AddUserCard.css";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { acLoading } from "../../Redux/Loading"
import { NumericFormat } from "react-number-format";

export function AddUserCrud() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [imgData, setImgData] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    about: "",
    price: "",
    cost: "",
    quantity: "",
    discaunt: "",
    size: [],
    season: "qishgi",
    forWhom: "ayollar",
  });

  const inputChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const newproduct = JSON.stringify(product);

  function submitUserData(e) {
    e.preventDefault();
    console.log(newproduct);
    const formData = new FormData();
    for (let i = 0; images.length > i; i++) {
      formData.append("img", images[i]);
    }
    formData.append("data", newproduct);

    dispatch(acLoading(true));
    axios("https://xpress.pandashop.uz/api/product/add", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        token: "qev234-23fvg24-vg24tae",
      },
      data: formData,
    })
      .then((res) => {
        console.log(res.data);
        enqueueSnackbar("Product succesfully added", { variant: "success" });
        navigate("/product")
        dispatch(acLoading(false));
      })
      .catch((err) => {
        navigate("/product")
        dispatch(acLoading(false));
        enqueueSnackbar("Product not added", { variant: "error" });
        console.log(err.response.data.message);
      });
  }

  return (
    <>
      <form id="add-crud-form" onSubmit={submitUserData}>
        <div id="ad-user-crud-container">
          <div id="ad-user-crud-container-left">
            <input
              onChange={inputChange}
              value={product.name}
              name="name"
              type="text"
              placeholder="Write name..."
              required
            />
            <input
              onChange={inputChange}
              value={product.about}
              name="about"
              type="text"
              placeholder="Write about..."
              required
            />
            <NumericFormat
              value={product.price}
              placeholder="Write price..."
              // format="+99 (8##) ### ####"
              suffix="$"
              maxLength="3"
              thousandSeparator=","
              allowemptyformatting="true"
              name="price"
              onValueChange={(values) => {
                const { value } = values;
                setProduct({ ...product, price: value });
              }}
            />
            <NumericFormat
              value={product.cost}
              placeholder="Write cost..."
              format=""
              suffix="$"
              thousandSeparator=","
              allowemptyformatting="true"
              name="cost"
              onValueChange={(values) => {
                const { value } = values;
                setProduct({ ...product, cost: value });
              }}
            />
            <label
              id="upload-images-crud-add-label"
              style={imgData.length === 4 ? { pointerEvents: "none" } : {}}
            >
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                multiple="multiple"
                onChange={(e) => {
                  setImages([...images, ...e.target.files]);
                  const MyFiles = [...imgData];
                  for (let i = 0; i < e.target.files.length; i++) {
                    if (MyFiles.length < 4) {
                      MyFiles.push(e.target.files[i]);
                    } else {
                      MyFiles.splice(0, 1);
                      MyFiles.push(e.target.files[i]);
                    }
                  }
                  setImgData(MyFiles);
                }}
              />
              Choose Image
            </label>
          </div>
          <div id="ad-user-crud-container-right">
            <input
              onChange={inputChange}
              value={product.quantity}
              name="quantity"
              type="number"
              placeholder="Quantity"
              required
            />
            <input
              type="text"
              name="size"
              value={product.size}
              onChange={inputChange}
              placeholder="Size"
            />
            <NumericFormat
              value={product.discaunt}
              placeholder="Discount"
              suffix="%"
              allowemptyformatting="true"
              name="discaunt"
              onValueChange={(values) => {
                const { value } = values;
                setProduct({ ...product, discaunt: value });
              }}
            />

            {/* <p>Choose season</p> */}
            <select
              id="add-user-select-item"
              value={product.season}
              name="season"
              onChange={inputChange}
            >
              <option value="qishgi">Qishgi</option>
              <option value="bahorgi">Bahorgi</option>
              <option value="yozgi">Yozgi</option>
              <option value="kuzgi">Kuzgi</option>
            </select>
            {/* <p>For Whom</p> */}
            <select
              id="add-user-select-item"
              value={product.forWhom}
              name="forWhom"
              onChange={inputChange}
            >
              <option value="ayollar">Ayollar</option>
              <option value="erkaklar">Erkaklar</option>
              <option value="yoshbolalar">Yosh Bolalar</option>
              <option value="ssmirlar">Osmirlar</option>
            </select>
          </div>
        </div>
        <div id="upload-images-container">
          {imgData.map((item, index) => {
            return (
              <div key={index}>
                <div>
                  <figure id="upload-images-crud">
                    <button
                      type="button"
                      onClick={() => {
                        setImgData(imgData.filter((item, i) => i !== index));
                      }}
                    >
                      X
                    </button>
                    <img src={URL.createObjectURL(item)} alt="" />
                  </figure>
                </div>
              </div>
            );
          })}

        </div>
        <button id="ad-crud-btn">Add Product</button>
      </form>
    </>
  );
}
