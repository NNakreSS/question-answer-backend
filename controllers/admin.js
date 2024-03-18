import asyncErrorWrapper from "express-async-handler";

const blockUser = asyncErrorWrapper(async (req, res, next) => {
  const user = req.data;
  user.blocked = !user.blocked;

  console.log(user);
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Block / Unbloc successfully",
  });
});

export { blockUser };
