"use client";
import React, { useEffect, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";

const Page = (props) => {

  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      <Heading
        title="Schoolmas"
        description="Schoolmas is an integrated platform streamlining administration, communication, and academic management for schools."
        keywords="School Administration, Academic Management, Student Information, System Attendance Tracking, Gradebook, Parent Communication, Teacher Management, Timetable Scheduling, Online Learning, Homework Management, Report Cards, Fee Management, Library Management, School Communication, Campus Management, Enrollment System, School Analytics, School Software, Education Technology, E-Learning"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem }
      />
    </div>
  );
};

export default Page;
