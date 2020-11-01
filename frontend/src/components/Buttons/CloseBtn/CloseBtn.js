import React from "react";
import { IoIosClose } from "react-icons/io";

const CloseBtn = props => {
  const style = {};
  return <IoIosClose onClick={props.clicked} size={30} style={style} />;
};

export default CloseBtn;
