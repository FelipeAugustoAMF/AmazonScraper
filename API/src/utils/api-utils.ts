import type { Request, Response, NextFunction } from "express";

// wraps a handler function to catch errors and pass them to the next(error) middleware
// this is useful for async functions that return promises
// and need to be handled by the error handler middleware

export function wrapAsyncHandler(
    func: (req: Request, res: Response, next: NextFunction) => Promise<any>
): (req: Request, res: Response, next: NextFunction) => Promise<any> {
    return (req: Request, res: Response, next: NextFunction) =>
        func(req, res, next).catch(next);
}
