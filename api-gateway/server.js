const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000;

app.use('/airlines', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));
app.use('/flights', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));
app.use('/users', createProxyMiddleware({ target: 'http://localhost:3003', changeOrigin: true }));

app.listen(PORT, () => {
  console.log(`Gateway server is running on port ${PORT}`);
});
