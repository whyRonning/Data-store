import './App.css';
import React, {useState} from "react";
import {DownloadContainer} from "./downloadContainer";
import {UploadContainer} from "./uploadContainer";
import {connect} from "react-redux";
import {actions} from "./store/mainReducer";
import styled from "styled-components"

let Select=styled.select`
    width:10vw;
    height:4vh;
    margin-bottom:1.5vh;
@media(max-width:500px){
    width:30vw;
    height:4vh;
    margin-bottom:1.5vh;
    }
`
let Butt=styled.button`
    width:25vw;
    height:4vh;
    margin-right:2vw;
`
let ButtUpload=styled(Butt)`
${(props) => props.changeButton === "upload" ?
    "background-color:#aa02be;color:white;border-color:blue;" :
    "background-color:orange"
}
`
let ButtDownload=styled(Butt)`
   ${(props) => props.changeButton === "download" ?
    "background-color:#aa02be;color:white;border-color:blue;" :
    "background-color:orange"
}`
let MSTP = (state) => ({
    user: state.user
})
export let App = (props) => {
    let [changeButton, setChangeButton] = useState("upload");
    let changeUserHandler = (e, fun) => {
        fun(e.target.value)
    }
    return (
        <div className="App">
            <div>
                <h1>Имя пользователя</h1>
                <Select value={props.user} onChange={(e) => {
                    changeUserHandler(e, props.changeUserAC)
                }}>
                    <option value="olesya">Олеся</option>
                    <option value="roma">Рома</option>
                    <option value="mom">Мама</option>
                    <option value="addy">Эдуард</option>
                </Select>
            </div>
            <ButtUpload changeButton={changeButton} onClick={() => {setChangeButton("upload")}}>Отправить</ButtUpload>
            <ButtDownload changeButton={changeButton} onClick={() => {setChangeButton("download")}}>Загрузить</ButtDownload>
            {changeButton === "download" ? <DownloadContainer/> : <UploadContainer/>}
        </div>
    );
};
export let AppContainer = connect(MSTP, {changeUserAC: actions.changeUserAC})(App);
