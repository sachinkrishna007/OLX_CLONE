import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

import Heart from "../../assets/Heart";
import "./Post.css";
import { FirebaseContext } from "../../store/firebaseContext";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Post, { PostContext } from "../../store/postContext";

function Posts() {
  const { db } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const { setPostDetails } = useContext(PostContext);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getDocs(collection(db, "products")).then((snapshot) => {
      const allpost = snapshot.docs.map((product) => {
        return { ...product.data(), id: product.id };
      });
      setProducts(allpost);
      console.log(products);
    });
  }, [db]);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((products) => {
            return (
              <div
                className="card"
                onClick={() => {
                  setPostDetails(products);
                  navigate("/view");
                }}
              >
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={products.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {products.price}</p>
                  <span className="kilometer">{products.price}</span>
                  <p className="name">{products.name}</p>
                </div>
                <div className="date">
                  <span>{products.createdAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
