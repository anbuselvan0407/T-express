import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: any; // you can type this properly if you want, e.g., { id: string, email: string }
  }
}
