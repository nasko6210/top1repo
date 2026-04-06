import { BASE_URL } from "../constant-data/env";
import axios from "axios";
import { useEffect, useState } from "react";

export function Minipostermain({ info1, info2, image }) {
  const imageStyle = {
    width: "130px",
    height: "130px",
    backgroundImage: `url("/pictures/${image}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "10px",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <div style={imageStyle}></div>
      <div>{info1}</div>
      <div>{info2}</div>
    </div>
  );
}
