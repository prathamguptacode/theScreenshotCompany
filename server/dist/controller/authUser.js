import user from '../model/userSchema.js';
import jwt from 'jsonwebtoken';
async function authUser(req, res) {
    let key = req.body?.key;
    const signCan = req.body?.signCan;
    const tokenC = req.cookies?.userToken;
    if (tokenC) {
        if (process.env.TOKENKEY) {
            try {
                const userVal = jwt.verify(tokenC, process.env.TOKENKEY);
                key = userVal.user;
            } catch (error) {
                console.log('invalid token ');
            }
        }
    }
    if (!key) {
        const clientRes = {
            message: 'key not found',
            mission: 'failed',
        };
        return res.status(403).json(clientRes);
    }
    const myUser = await user.findOne({ key });
    if (!myUser) {
        // if user does not exists we create one
        const newUser = new user({
            key,
        });
        await newUser.save();
        if (process.env.ACTOKENKEY) {
            const userData = jwt.sign({ user: key }, process.env.ACTOKENKEY, {
                expiresIn: '0.5h',
            });
            const clientRes = {
                message: `welcome new user ${newUser.key}`,
                mission: 'success',
                documents: newUser.documents,
                docNames: newUser.docName,
                authToken: userData,
                key: key,
            };
            if (signCan) {
                //sending cookies to stay signed in
                if (process.env.TOKENKEY) {
                    const token = jwt.sign({ user: key }, process.env.TOKENKEY);
                    res.cookie('userToken', token, {
                        httpOnly: true,
                        secure: true, // Only sent over HTTPS
                        sameSite: 'None',
                    });
                } else {
                    console.error('something went wrong jwt keys not found');
                }
            }
            return res.json(clientRes);
        } else {
            console.error('something went wrong jwt keys not found');
        }
    }
    if (myUser) {
        if (signCan) {
            //sending cookies to stay signed in
            if (process.env.TOKENKEY) {
                const token = jwt.sign({ user: key }, process.env.TOKENKEY);
                res.cookie('userToken', token, { httpOnly: true });
            } else {
                console.error('something went wrong jwt keys not found');
            }
        }
        if (process.env.ACTOKENKEY) {
            const userData = jwt.sign({ user: key }, process.env.ACTOKENKEY, {
                expiresIn: '0.5h',
            });
            const clientRes = {
                message: `welcome user ${myUser.key}`,
                mission: 'success',
                documents: myUser.documents,
                docNames: myUser.docName,
                authToken: userData,
                key: key,
            };
            return res.json(clientRes);
        } else {
            console.error('something went wrong jwt keys not found');
        }
    }
}
export default authUser;
//# sourceMappingURL=authUser.js.map
