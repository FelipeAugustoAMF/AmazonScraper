// this midleware handles unhandled exceptions in the application
// and returns a response with the error details
// it is used to prevent the application from crashing when an error occurs during a request
// and allows the application to continue running

export const errorHandler = (err: Error, req: any, res: any, next: any) => {
    // 500 for internal server error
    res.status(500).json({
        "success": false,
        "message": err.message,
        "stack": err.stack,
    });
}
