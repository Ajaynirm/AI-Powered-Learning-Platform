import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 20, // each IP can make 100 requests per windowMs
    message: "Too many requests, please try again later.",
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false,  // Disable the `X-RateLimit-*` headers
  });