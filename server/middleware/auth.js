import jwt from "jsonwebtoken";

// wants to like a post
// click the like button => auth middleware (next) => like controller...

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500; // if its greater it will be googleAuth

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, "test");

            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub; // sub is used by google for id
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

export default auth;
