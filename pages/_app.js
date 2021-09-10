import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import { useRouter } from "next/router";
import firebase, { auth } from "../firebase";
import { toast } from "react-toastify";
import {login, logout} from "../src/features/userSlice"
import store from "../src/app/store";
import { Provider, useDispatch, useSelector, connect  } from "react-redux";

import PageChange from "components/PageChange/PageChange.js";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "styles/tailwind.css";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

class MyApp extends App {

  
  
  componentDidMount() {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log("User Signed IN ");
        store.dispatch(
          login({
            email: authUser.email,
            uid: authUser.uid,
            displayName: authUser.displayName,
            photoUrl: authUser.photoURL,
          })
        );
      } else {
        console.log("User Signed OUT ");
        store.dispatch(logout());
        Router.push("/");
      }
    });

    let comment = document.createComment(`

=========================================================
* Notus NextJS - v1.1.0 based on Tailwind Starter Kit by Creative Tim
=========================================================

* Product Page: https://www.creative-tim.com/product/notus-nextjs
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/notus-nextjs/blob/main/LICENSE.md)

* Tailwind Starter Kit Page: https://www.creative-tim.com/learning-lab/tailwind-starter-kit/presentation

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

`);
    document.insertBefore(comment, document.documentElement);
  }
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);


    // auth.onAuthStateChanged((authUser) => {
    //   if (authUser) {
    //     console.log("User Signed IN ");
    //     store.dispatch(
    //       login({
    //         email: authUser.email,
    //         uid: authUser.uid,
    //         displayName: authUser.displayName,
    //         photoUrl: authUser.photoURL,
    //       })
    //     );
    //   } else {
    //     console.log("User Signed OUT ");
    //     store.dispatch(logout());
    //   }
    // });

    return (
      <Provider store={store}>
        <React.Fragment>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <title>Notus NextJS by Creative Tim</title>
            <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script>
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </React.Fragment>
      </Provider>
    );
  }
}
export default MyApp
