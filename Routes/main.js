const config = require("config");
const { Router } = require("express");
const router = Router();
const imgIds=require("../models/imgIds");
const fs = require('fs');
router.post("/upload", async (req, res) => {
    try {
		
        if(!req.files || !req.fields.user){
            res.status(500).json({message:"Не хватает данных"})
        }else{
        let keys=Object.keys(req.files);
        let extensions=keys.map(e=>{
            return e.slice(Number(`-${e.split("").reverse().indexOf(".")}`))
        })
        for (let i in keys){
            let img=new imgIds({name:keys[i],extension:extensions[i],user:req.fields.user});
            await img.save()
        }
        let imgsData=await imgIds.find({user:req.fields.user}).sort({ _id: -1 }).limit(keys.length);
        imgsData=imgsData.reverse();
        let responses=0;
        let writeHandler=()=>{
            if(responses+1===keys.length){
                res.status(200).json({message:"Файлы загружены"})
            }
            else{
                responses++
            }
        }

        for (let i in keys){
            fs.readFile(req.files[keys[i]].path,(err,e)=>{
                if(err) {
                    throw new Error(err)
                }else {
                    fs.writeFile("front/build/images/" + req.fields.user + "/" + imgsData[i]._id + "." + imgsData[i].extension, e, (err) => {
                        if (err) {
                            throw new Error(err)
                        } else {
                            writeHandler()
                        }
                    })
                }})
        }

        }
    } catch (e) {
        console.log(e)
        res.status(500).json({message:"Ошибка, обратитесь к Эду",err:e})
    }
})
router.post("/download", async (req, res) => {
	
    try {

        if (!Number(req.fields.number)|| !req.fields.user) {
            res.status(500).json({message: "Не хватает данных"})
        } else {
            let imgsData = await imgIds.find({user: req.fields.user}).sort({_id: -1}).limit(Number(req.fields.number));
            res.status(200).json({
                message:"ad",
                data: imgsData.map(e => {
                    return {id: e._id, extension: e.extension, name: e.name}
                })
            })
        }
    }
    catch (e) {
        console.log(e)
        res.status(500).json({message:"Ошибка, обратитесь к Эду",err:e})
    }
});

module.exports = router;