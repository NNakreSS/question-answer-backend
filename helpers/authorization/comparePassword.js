import bcrypt from "bcryptjs";

const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);

export default comparePassword;
