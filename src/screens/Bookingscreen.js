import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "react-spinners/BounceLoader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";

const Bookingscreen = () => {
  let { roomid, fromdate, todate } = useParams();
  const [room, setroom] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  const a = moment(fromdate, "MM-DD-YYYY");
  const b = moment(todate, "MM-DD-YYYY");

  const totaldays = moment.duration(b.diff(a)).asDays() + 1;
  const [totalamount, settotalamount] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        setloading(true);
        const data = (await axios.post("/api/rooms/getroombyid", { roomid }))
          .data;
        settotalamount(data.rentperday * totaldays);
        setroom(data);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onToken = async (token) => {
    console.log(token);
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
      token,
    };
    try {
      setloading(true);
      const result = await axios.post("/api/bookings/bookroom", bookingDetails);
      setloading(false);
      Swal.fire("Congratulations", "Your Room Booked Successfully", "success").then(result =>{
        window.location.href = '/bookings'
      })   
     } catch (error) {
      setloading(false);
      Swal.fire("OOPS", "Something Went Wrong", "error");
    }
  };
  return (
    <div>
      {loading ? (
        <div className="position-absolute top-50 start-50">
          {" "}
          <Loader />
        </div>
      ) : room ? (
        <div>
          <div className="row shadow justify-content-center rounded m-5 p-3">
            <div className="col-md-5">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className="w-100" alt=""></img>
            </div>
            <div style={{ textAlign: "right" }} className="col-md-5">
              <b>
                <h1>Booking Details</h1>
                <hr />
                <p>
                  Name: {JSON.parse(localStorage.getItem("currentUser")).name}{" "}
                </p>
                <p>From date:{fromdate} </p>
                <p>To date:{todate} </p>
                <p>Max count: {room.maxcount}</p>

                <h1>Amount:</h1>
                <hr />
                <p>
                  Total Days:
                  {totaldays}
                </p>
                <p>Rent per day: {room.rentperday}</p>
                <p>Total Amount: {totalamount}</p>
                <hr />
              </b>
              <div>
                <StripeCheckout
                  amount={totalamount * 100}
                  token={onToken}
                  currency="INR"
                  stripeKey="pk_test_51JIlvySCsnvabcXteZoUCotkK5E7q2G6MC6T7Kk3A3wuqnDZWN1ej5IDFNZBh5bb9LOm175W56NmV8QjmN8n3fuO00kbyZMl6T"
                >
                  <button
                    style={{ float: "right" }}
                    className=" shadow-none btn btn-dark"
                  >
                    Pay Now
                  </button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
};

export default Bookingscreen;
