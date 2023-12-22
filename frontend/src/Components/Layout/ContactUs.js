import { Send } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import "./Contactus.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { contactUsAction } from "../../Actions/userActions";
import { CONTACTUS_RESET } from "../../Constants/userConstants";
import Loader from "./Loader";
const ContactUs = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [message, setMessage] = useState("");
  const { success, error, loading } = useSelector((state) => state.contactus);
  const submitContactHandler = (e) => {
    e.preventDefault();
    if (phone.trim().length !== 10) {
      toast.error("Phone Number Must be 10 Digit");
    }
    if (email && phone && message) {
      dispatch(contactUsAction({ email, phone, message }));
      setEmail("");
      setPhone("");
      setMessage("");
    } else {
      toast.error("Please Fill All Fields");
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      dispatch({ type: CONTACTUS_RESET });
      toast.success("Message Send Successfully");
    }
  }, [error, success, dispatch]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <form className="contactus" onSubmit={submitContactHandler}>
          <h2>Contact Us</h2>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            type="email"
            sx={{ background: "white", width: "30vmax" }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Phone"
            variant="outlined"
            value={phone}
            type="number"
            sx={{ background: "white", width: "30vmax" }}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />

          <textarea
            style={{
              padding: "1vmax",
              width: "30vmax",
              height: "10vmax",
            }}
            placeholder="Leave Message Here"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
          />
          <Button variant="contained" endIcon={<Send />} type="submit">
            Send
          </Button>
        </form>
      )}
    </Fragment>
  );
};

export default ContactUs;
