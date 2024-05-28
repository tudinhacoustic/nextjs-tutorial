const config = {
  //   googleId: process.env.GOOGLE_ID || "",
  //   googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  passwordSalt: parseInt(process.env.PASSWORD_SALT || "5", 10),
  mongoDbUri: process.env.MONGO_URI || "",
};

export default config;
