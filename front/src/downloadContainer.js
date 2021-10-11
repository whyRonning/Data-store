import {connect} from "react-redux";
import {Download} from "./download";
import {actions} from "./store/mainReducer";
import React, {useState} from "react";
import styled from "styled-components";
let Butt=styled.button`
    margin-top:2vh;
    width:15vw;
    height:4vh;
    display:block;
    background-color:#aa02be;
    color:white;
    margin-left:40vw;
    @media(max-width:500px){
    margin-left:2vw;
    width:25vw;
    height:4vh;
    margin-left:38vw;
    }
`;
let FilesBlock=styled.div`
    display:grid;
    grid-template-columns:33% 33% 33%;
`
let Count=styled.input`
    margin-left:2vw;
    width:5vw;
`;
let CountBlock=styled.div`
margin-top:2vh;
`
let MSTP=(store)=>({
    files:store.files,
    user:store.user
})
let DownloadWrapper=(props)=>{
    let [numberImg,setNumberImg]=useState("0")
    let [name,setName]=useState(props.user)
    let inputHandler=(e,set)=> {
        set(e.target.value)
    }
    let buttHandler = (user,number,downloadAC) => {
        if (number>0 && !isNaN(number)){
        setName(user)
        downloadAC(user,number)
        }
    }
    let imgs=props.files.map(e=>{
        return <Download key={e.id} extension={e.extension} nameOfFile={e.name} src={e.id} name={name}/>
    })
    return (
        <div>
            <CountBlock>
            <label htmlFor="imgNumbers">Количество выводимых файлов</label>
            <Count type="text"  value={numberImg} onChange={(e)=>{inputHandler(e,setNumberImg,props.downloadAC)}}/>
            </CountBlock>
            <Butt onClick={()=>{buttHandler(props.user,numberImg,props.downloadAC)}}>Загрузить</Butt>
            <FilesBlock>
            {imgs}
            </FilesBlock>
        </div>
        )
}
export let DownloadContainer=connect(MSTP,{downloadAC:actions.downloadAC})(DownloadWrapper);