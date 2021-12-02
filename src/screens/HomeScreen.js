import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Bookingscreen from "./Bookingscreen";
import Loader from "react-spinners/BounceLoader";
import Error from "../components/Error";
import moment from "moment";
import { DatePicker, Space } from "antd";
import "antd/dist/antd.css";

const { RangePicker } = DatePicker;

const HomeScreen = () => {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [duplicaterooms, setduplicaterooms] = useState([]);
  const [searchkey, setsearchkey] = useState();
  const [type, settype] = useState("all");
  useEffect(() => {
    async function fetchData() {
      try {
        setloading(true);
        const data = (await axios.get("/api/rooms/getallrooms")).data;
        setrooms(data);
        setduplicaterooms(data);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    }
    fetchData();
  }, []);

  const filterByDate = (dates) => {
    setfromdate(moment(dates[0]).format("MM-DD-YYYY"));
    settodate(moment(dates[1]).format("MM-DD-YYYY"));

    var temprooms = [];
    var availability = false;

    for (const room of duplicaterooms) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (
            !moment(moment(dates[0]).format("MM-DD-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            ) &&
            !moment(moment(dates[1]).format("MM-DD-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            )
          ) {
            if (
              moment(dates[0]).format("MM-DD-YYYY") !== booking.fromdate &&
              moment(dates[0]).format("MM-DD-YYYY") !== booking.todate &&
              moment(dates[1]).format("MM-DD-YYYY") !== booking.fromdate &&
              moment(dates[1]).format("MM-DD-YYYY") !== booking.todate
            ) {
              availability = true;
            }
          }
        }
      }

      if (availability == true || room.currentbookings.length == 0) {
        temprooms.push(room);
      }
      setrooms(temprooms);
    }
  };
  const filterBySearch = () => {
    const temprooms = duplicaterooms.filter(room => room.name.toLowerCase().includes(searchkey.toLowerCase()))
    setrooms(temprooms)
  }

  const filterByType = (e) => {
    settype(e)
    if(e!=='all'){
      const temprooms = duplicaterooms.filter(room=>room.type.toLowerCase()==e.toLowerCase())
    setrooms(temprooms)
    }else{
      setrooms(duplicaterooms)
    }
  }
  return (
    <div className="container">
      <div className="shadow row p-2  mt-5 align-center">
        <div className="col-md-3 mt-2">
          <RangePicker
            className="border border-dark"
            format="DD-MM-YYYY"
            onChange={filterByDate}
          />
        </div>
        <div className="col-md-5 mt-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search Rooms"
            value={searchkey}
            onChange={(e) => {
              setsearchkey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          ></input>
        </div>
        <div className="col-md-3">
          <select className="w-100 form-control mt-2 shadow-none border border-dark" value={type} onChange={(e)=>{filterByType(e.target.value)}}>
            <option value="all">All</option>
            <option value="delux">Delux</option>
            <option value="non-delux">Non-Delux</option>
          </select>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <div className="position-absolute top-50 start-50">
            {" "}
            <Loader />
          </div>
        ):(
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-2">
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
