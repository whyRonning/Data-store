import {put, call, takeEvery} from "@redux-saga/core/effects";
import {message} from "antd";

let data = {
    user: "olesya",
    files:[]
};
export let mainReducer = (store = data, action) => {
    switch (action.type) {
        case "changeUser": {
            return {...store, user: action.user};
        }
        case "changeFiles":{
            console.log(action.imageIds)
            return {...store,files: action.imageIds}
        }
        default:
            return store
    }
}
export let actions = {
    changeUserAC: (user) => ({
        type: "changeUser",
        user
    }),
    downloadAC: (user, number) => ({
        type: "download",
        user, number
    }),
    uploadAC: (user, images) => ({
        type: "upload",
        user, images
    })
};
let download = async (data) => {
    try {
        let formData=new FormData();
        formData.append("user",data.user);
        formData.append("number",data.number);
        let response = await fetch("/api/download", {method: "POST", body: formData})
        response=await response.json()
        return response.data
    } catch (e) {
        console.log(e)
        message.error("Обратитесь с ошибкой к Эду")
    }
};
let upload=async (data) => {
    try {
        let formData=new FormData();
        formData.append("user",data.user);
        for(let i=0;i<data.images.length;i++){
            formData.append(data.images[i].name,data.images[i],data.images[i].name);
        }
        let res=await fetch("/api/upload",{method: "POST",body:formData });
        res= await res.json()
        message.success(res.message)
    } catch (e) {
        message.error("Обратитесь с ошибкой к Эду")
    }
};
function* downloadWrapper(user, number) {
    let imageIds = yield call(download, user, number);
    yield put({imageIds, type: "changeFiles"})
}

export function* rootSaga() {
    yield takeEvery("download", downloadWrapper);
    yield takeEvery("upload",upload);
}