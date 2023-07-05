import { addToFavourite, deleteData, getAllDatas, wordcountFind } from "../helper/wordCountHelper.js";

export const wordCount = async (req, res, next) => {
  try {
    const {url} =req.body
    const data ={url , userId: req.user}
    const response = await wordcountFind(data);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const dashboard = async (req, res,next) => {
   try {
    const response = await getAllDatas(req.user)
    res.status(200).json(response);
} catch (error) {
    next(error);
  }
}

export const removeData = async (req, res, next)=>{
    try {
        const id = req.params.id;
        const response = await deleteData(req.user,id)
        res.status(200).json(response);
    } catch (error) {
        next(error);
      }
}

export const favouriteData = async (req, res, next)=>{
    try {
        const id = req.params.id;
        const response = await addToFavourite(req.user,id)
        res.status(200).json(response);
    } catch (error) {
        next(error);
      }
}