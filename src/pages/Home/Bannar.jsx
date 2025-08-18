import React from "react";
import { motion } from "motion/react";
import { easeOut } from "motion";
import team1 from "../../assets/team/team1.jpg"
import team2 from "../../assets/team/team2.jpg"
import team3 from "../../assets/team/team3.jpg"
import { MdNotStarted } from "react-icons/md";


const Bannar = () => {
  return (
    <div className="hero bg-base-200 min-h-96 pt-20 pb-10">
      <div className=" hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1">
          <motion.img
            src={team1}
            animate={{y:[100,50,100]}}
            transition={{duration:10,repeat:Infinity}}
            className="max-w-sm w-64 rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4  border-blue-300 shadow-2xl"
          />
          <motion.img
            src={team3}
            animate={{x:[100,150,100]}}
            transition={{duration:10,delay:5,repeat:Infinity}}
            className="max-w-sm w-64 rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4  border-blue-300 shadow-2xl"
          />
        </div>
        <div className="flex-1  lg:pl-16">
          <motion.h1
            animate={{ x: 50 }}
            transition={{
              duration: 2,
              delay: 1,
              ease: easeOut,
              repeat: Infinity,
            }}
            className="text-5xl font-bold"
          >
            Latest <motion.span animate={{color:'#ecff33'}} transition={{duration:1.5,repeat:Infinity}}>Jobs</motion.span> For You!!
          </motion.h1>
          <p className="py-6">
          "Find the right job faster with smart matching and top employers. Whether you're starting out or leveling up, your next opportunity is here."
          </p>
          <button className="btn btn-primary"><MdNotStarted />Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Bannar;
