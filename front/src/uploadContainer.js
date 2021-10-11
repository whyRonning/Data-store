import {connect} from "react-redux";
import {Upload} from "./upload";
import {actions} from "./store/mainReducer";
import React, {useState} from "react";
let MSTP=(store)=>({
    user:store.user
})
let UploadWrapper=(props)=>{
    let [currentImg,setCurrentImg]=useState([]);
    let inputHandler=(e,setCurrentImg)=> {

        setCurrentImg(e.target.files)
    }
    let buttHandler = (currentImg,user,uploadAC) => {
        uploadAC(user,currentImg)
    }
    return <Upload inputHandler={inputHandler} buttHandler={buttHandler} currentImg={currentImg} setCurrentImg={setCurrentImg} {...props}/>
}
export let UploadContainer=connect(MSTP,{uploadAC:actions.uploadAC})(UploadWrapper);