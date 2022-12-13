import React, { useState } from "react";
import LikeIcon from "../assets/images/emotions/like.svg";
import Angry from "../assets/images/emotions/angry.svg";
import Laughing from "../assets/images/emotions/laughing.svg";
import Like from "../assets/images/emotions/like.svg";
import Sad from "../assets/images/emotions/sad.svg";
import Soaked from "../assets/images/emotions/soaked.svg";
import Love from "../assets/images/emotions/love.svg";
import { motion } from "framer-motion";
import "./FBReactions.scss"
const FBReactions = () => {
  const [btnClicked, setBtnClicked] = useState(false);
  const [btnSelected, setBtnSelected] = useState(null);

  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.2,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "beforeChildren",
      },
      scale: 0.6,
    },
  };
  let data = [

    {
        id: 1,
        name: "Like",
        icon: Like,
        color: "#4b7bec",
    },
    {
        id: 2,
        name: "Love",
        icon: Love,
        color: "#e929f2",
    },
    {
        id: 3,
        name: "Haha",
        icon: Laughing,
        color: "#f7b731",
    },
    {
        id: 4,
        name: "Wow",
        icon: Soaked,
        color: "#f7b731",
    },
    {
        id: 5,
        name: "Sad",
        icon: Sad,
        color: "#f7b731",
    },
    {
        id: 6,
        name: "Angry",
        icon: Angry,
        color: "#f7b731",
    },
    ];
    

  return (
    <motion.div className="parentDiv" onClick={() => btnClicked === true && setBtnClicked(false)}>
      
      <motion.button
        whileHover={{ scale: 1.2 }}
        className="likeBtn"
        onClick={() => setBtnClicked(true)}
        
      >
        <motion.div
        className="reactionsHolder"
        variants={list}
        initial={
          btnClicked === true ? "visible" : "hidden"
        }
      >
        {data.map((item) => (
            <motion.img
                whileHover={{ scale: 1.5 }}
                src={item.icon}
                alt={item.name}
                width="40"
                
                onClick={() => {
                    setBtnClicked(false);
                    setBtnSelected(item.id);
                }}
            />
        ))}
      </motion.div>
        <motion.img src={
            btnSelected === null ? LikeIcon : data.find((item) => item.id === btnSelected).icon
        } width="15" /> 
        {/* &nbsp; {btnSelected ? data.find((item) => item.id === btnSelected).name : "Like"} */}
      </motion.button>
    </motion.div>
  );
};

export default FBReactions;