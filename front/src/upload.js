import React from "react";
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
let File=styled.input`
    margin-top:2vh;
`
export let Upload=(props)=>{
       return <div>
        <form>
            <File multiple onChange={(e)=>{props.inputHandler(e,props.setCurrentImg)}} type="file"/>
        </form>
           <Butt onClick={()=>{props.buttHandler(props.currentImg,props.user,props.uploadAC)}}>Отправить</Butt>
    </div>
}