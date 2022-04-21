import asyncHandler from "express-async-handler";

//newslist model
import Content from "../model/ContentModel";

//get all contents of specific user
export const getContentList = asyncHandler(async (req, res) => {
  const contentList = await Content.find({
    createdBy: req.user.id,
  });

  //send my created news list
  res.status(200).json(contentList);
});

//get single content data
export const getSingleContentData = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const contentExits: any = await Content.findById(id);
  if (!contentExits) {
    res.status(401);
    throw new Error("Please provide a valid id");
  }

  //check if user is authorized to delete the news
  if (contentExits.createdBy.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }
  res.status(200).json(contentExits);
});

//add content
export const addContent = asyncHandler(async (req, res) => {
  const { title, desc, contentURL }: ContentInterface = req.body;
  if (!title || !desc || !contentURL) {
    res.status(400);
    throw new Error("Please provide all info");
  }

  //add new content
  const newContent = await Content.create({
    title,
    desc,
    contentURL,
    createdBy: req.user.id,
  });

  //send added content info
  res.status(200).json(newContent);
});

//update content
export const updateContent = asyncHandler(async (req, res) => {
  const id = req.params.id;

  //see if the content exits.
  const contentExits: any = await Content.findById(id);

  if (!contentExits) {
    res.status(400);
    throw new Error("please provide a valid id");
  }

  //check if user is authorized to delete the news
  if (contentExits.createdBy.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }

  const updatedContent = await Content.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  //send teh upated news data
  res.status(200).json({ id: id, data: updatedContent });
});

//delete
export const deleteContent = asyncHandler(async (req, res) => {
  const id = req.params.id;
  //see if the news exits.
  const contentExits: any = await Content.findById(id);

  if (!contentExits) {
    res.status(400);
    throw new Error("please provide a valid id");
  }

  //check if user is authorized to delete the news
  if (contentExits.createdBy.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not Authorized");
  }

  await contentExits.remove();
  // send the removed news data
  res.status(200).json({ id: id });
});
