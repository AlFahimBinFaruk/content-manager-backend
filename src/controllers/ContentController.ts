import asyncHandler from "express-async-handler";
//content model
import Content from "../model/ContentModel";

//get all contents of specific user
export const getContentList = asyncHandler(async (req, res) => {
  const contentList = await Content.find({
    createdBy: req.user.id,
  });
  //send only the content which match with user id
  res.status(200).json(contentList);
});

//get single content data
export const getSingleContentData = asyncHandler(async (req, res) => {
  const id = req.params.id;
  //see if content exits
  const contentExits: any = await Content.findById(id);
  //is content dosent exits
  if (!contentExits) {
    res.status(401);
    throw new Error("Please provide a valid id");
  }

  //check if user is authorized to see the content
  if (contentExits.createdBy.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }
  res.status(200).json(contentExits);
});

//add content
export const addContent = asyncHandler(async (req, res) => {
  const { title, desc, contentURL }: ContentInterface = req.body;
  //Double check if field every value is there
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

  //check if user is authorized to update the content
  if (contentExits.createdBy.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }

  //only the field that has provided will be updated other field will be same.
  const updatedContent = await Content.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  //send the upated content data
  res.status(200).json({ id: id, data: updatedContent });
});

//delete
export const deleteContent = asyncHandler(async (req, res) => {
  const id = req.params.id;
  //see if the content exits.
  const contentExits: any = await Content.findById(id);
  //if content dosent exits
  if (!contentExits) {
    res.status(400);
    throw new Error("please provide a valid id");
  }

  //check if user is authorized to delete the content
  if (contentExits.createdBy.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not Authorized");
  }

  //remove the mathched content
  await contentExits.remove();
  // send the removed content id
  res.status(200).json({ id: id });
});
