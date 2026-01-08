function auth(req, res, next) {
    const userToken = req.cookies?.userToken;
    if (!userToken) {
        const cleintRes = {
            message: 'unauthorized user',
            mission: 'failed',
        };
        return res.json(cleintRes);
    }
    next();
}
export default auth;
//# sourceMappingURL=auth.js.map