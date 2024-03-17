const sendJwtToClient = (user, res) => {
  const { JWT_COOKIE, NODE_ENV } = process.env;
  // generate  JWT
  const token = user.generateJwtFromUser();
  // Response
  return res
    .status(200)
    .cookie("access_token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000),
      secure: NODE_ENV === "production",
    })
    .json({
      success: true,
      access_token: token,
      data: {
        name: user.name,
        email: user.email,
      },
    });
};

export default sendJwtToClient;
