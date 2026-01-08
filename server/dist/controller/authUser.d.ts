import type { Request, Response } from 'express';
declare function authUser(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export default authUser;
//# sourceMappingURL=authUser.d.ts.map