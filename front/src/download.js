import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
let Img=styled.img`
    max-width:33vw;
    display:block;
    max-height:20vh;
`
let P=styled.div`
    height:6vh;
`
let ImgBlock=styled.div`
  height:20vh;
  display:grid;
  justify-content:center;

`
export let Download = (props) => {
    return <div>
        <ImgBlock>
        <Img  src={props.extension==="png"||props.extension==="jpg"?"/images/"+props.name+"/"+props.src+"."+props.extension :
            props.extension==="doc"||props.extension==="docx"?"docx.jpg":
                props.extension==="mp4"||props.extension==="mov"||props.extension==="mpg"||props.extension==="wmv"||props.extension==="rm"||props.extension==="fvl"?"video.png":
                    props.extension==="zip"||props.extension==="rar"?"arch.png":"unknown-file.png"
        } alt=""/>

        </ImgBlock>
        <P>
        <p>{props.nameOfFile}</p>
        </P>
        <div><Link to={"images/"+props.name+"/"+props.src+"."+props.extension} target="_blank" download>Скачать</Link>
        </div>
          </div>
}