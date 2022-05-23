import logo from "../../assets/img/3.jpg";
import { useEffect, useState } from "react";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import restaurantApi from "../../api/restaurant";
import food from "../../api/food";
import axios from "axios";
import PopupCart from "../cart/popupcart";
import jwt_decode from "jwt-decode";
import { useNavigate, createSearchParams } from "react-router-dom";
import Search from './search';

export default function NavbarApp() {
  const infoUser = JSON.parse(localStorage.getItem("accessToken"));
  const [searchParams, setSearchParams] = useSearchParams();

  const renderLogin = () => {
    const urlRedirect = searchParams.get("token");
    const local = JSON.parse(localStorage.getItem("accessToken"));
    if (local) {
      return (
        <>
          <a
            href="#"
            onClick={async () => {
              await window.location.replace("http://95.111.203.4:3020/");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
          </a>

          <li className="nav-item">
            <button
              class="btn btn-info ml-2 "
              type="button"
              data-toggle="popover"
              onClick={async () => {
                await localStorage.removeItem("accessToken");
                await window.location.replace("http://localhost:3000/");
              }}
            >
              Đăng Xuất
            </button>
          </li>
        </>
      );
    }
    if (urlRedirect) {
      const decode = jwt_decode(urlRedirect);
      localStorage.setItem("accessToken", JSON.stringify(decode));
      return (
        <>
          <a
            href="#"
            onClick={async () => {
              await window.location.replace("http://95.111.203.4:3020/");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
          </a>

          <li className="nav-item">
            <button
              class="btn btn-info ml-2 "
              type="button"
              onClick={async () => {
                await localStorage.removeItem("accessToken");
                await window.location.replace("http://localhost:3000/");
              }}
            >
              Đăng Xuất
            </button>
          </li>
        </>
      );
    } else {
      return (
        <li className="nav-item">
          <a
            className="nav-link"
            href="http://95.111.203.4:3020/Login?callback=http://localhost:3000/"
          >
            Login
          </a>
        </li>
      );
    }
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top"
        id="mainNav"
      >
        <div className="container">
          <Link to="/">
            <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/3/30bf6c528078ba28d34bc3e37d124bdb.svg"></img>
          </Link>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#services">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#portfolio">
                  Portfolio
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>

              {renderLogin()}
            </ul>
          </div>
        </div>
      </nav>
        <Search></Search>
    </div>
  );
}
