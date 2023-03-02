import {NextFunction, Request, Response} from "express";

export const asyncHandler = (fn : any) => {
    return function (req: Request, res: Response, next: NextFunction){
        const fnReturn = fn(req,res);
        return Promise.resolve(fnReturn).catch(e => next(e));
    }
}