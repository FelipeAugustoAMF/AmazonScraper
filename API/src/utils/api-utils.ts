import type { Request, Response, NextFunction } from "express";

// wraps an async handler function to catch errors and pass them to the next(error) middleware
// this is useful to prevent the application from crashing when an error occurs in the function

export function wrapAsyncHandler(
    func: (req: Request, res: Response, next: NextFunction) => Promise<any>
): (req: Request, res: Response, next: NextFunction) => Promise<any> {
    return (req: Request, res: Response, next: NextFunction) =>
        func(req, res, next).catch(next);
}
