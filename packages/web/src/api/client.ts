import axios from "axios";

import firebase from "../firebase";

const getAxiosClient = async () => {
  const user = firebase.auth().currentUser;
  const token = user && (await user.getIdToken());

  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export default getAxiosClient;
