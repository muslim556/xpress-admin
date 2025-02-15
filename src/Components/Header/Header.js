import React, { useEffect, useState } from "react";
import "./Header.css";
import searchIcon from "../../Assets/Icons/search-Regular.svg"
import bellIcon from "../../Assets/Icons/bell-Regular.svg"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { acSearch } from "../../Redux/Search"
import { Link } from "react-router-dom";
const api = process.env.REACT_APP_API;
export function Header() {

  const [data, setData] = useState()
  const [newData, setNewData] = useState()
  const [search, setSearch] = useState()
  const dispatch = useDispatch();
  useEffect(() => {
    axios("https://xpress.pandashop.uz/api/product",)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  useEffect(() => {
    axios("https://xpress.pandashop.uz/api/order",)
      .then((res) => {
        setNewData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);


  return (
    <div id="header">
      <div id="header_right">
        <form onSubmit={(e) => {
          dispatch(acSearch(e.target.search.value))
          e.preventDefault()
        }} id="header-right-form">
          <input placeholder="Search..." value={search} onChange={(e) => {
            setSearch(e.target.value.toLowerCase());
            dispatch(acSearch(e.target.value))
          }} name="search" type="text" />
          <img src={searchIcon} alt="" />
        </form>
        <img id="header-bell-icon" src={bellIcon} alt="" />
      </div>
      <div style={search ? { display: "flex" } : { display: "none" }} id="header-right-bottom">
        {
          search ? data.filter((fil) =>
            fil.name.toLowerCase().includes(search) ||
            fil.about.toLowerCase().includes(search)
          ).map((item, index) => {
            return (
              <div>
                <div id="header-right-bottom-item">
                  <p>{index + 1}</p>
                  <Link
                    onClick={() => {
                      setSearch(false)
                      setSearch("")
                    }}
                    to={`/product/${item.id}`}>{item.name}</Link>
                </div>
              </div>
            )
          }) : ""
        }
      </div>
    </div>
  );
}
