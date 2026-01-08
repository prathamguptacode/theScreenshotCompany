import type { Request, Response, NextFunction } from 'express';
declare function auth(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export default auth;
//# sourceMappingURL=auth.d.ts.map