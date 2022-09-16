import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import 'dotenv/config';
import routes from '@routes/index';

const app = express();
const httpServer = createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api', routes);

httpServer
  .listen(process.env.PORT, () => {
    console.log(
      `${process.env.NODE_ENV} - API Server Start At Port ${process.env.PORT}`
    );
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // UNABLE_TO_VERIFY_LEAF_SIGNATURE 에러 해결(보안 취약 / 추후 수정 필요)
  })
  .on('error', (err) => {
    console.log(err);
    process.exit(1);
  });
