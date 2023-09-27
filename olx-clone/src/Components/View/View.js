import React,{useEffect,useContext, useState} from 'react';
import { getDocs, query, where, collection } from "firebase/firestore";


import './View.css';
import  { PostContext } from '../../store/postContext';
import { FirebaseContext } from '../../store/firebaseContext';
function View() {
  const [userDetails, setUserDetails] = useState('');
  const { postDetails } = useContext(PostContext);
  const { db } = useContext(FirebaseContext);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { userId } = postDetails;
        console.log(postDetails);
        const usersCollection = collection(db, "users"); // Specify the Firestore collection
        const q = query(usersCollection, where("id", "==", userId));

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Check if there are matching documents
          querySnapshot.forEach((doc) => {
            setUserDetails(doc.data()); // Set the user details
          });
        } else {
          alert("no user founded");
          console.log("No matching user found.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails(); // Call the async function
  }, []); // Provide a
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.url} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
