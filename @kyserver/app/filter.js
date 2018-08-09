
const sleep = require('./utils').sleep;

KY.filter('/*', async (ctx, next) => {
  KY.logger(ctx.request.path + ' : ' + ctx.request.method);
  return Promise.resolve({ success: true });
});

KY.filter('/t1', async (ctx) => {
  KY.logger('t1 filter only');
  // ctx.request.fuser = {
  //   name: 'rgy 123',
  //   comp: 'zhubajie'
  // }
  return await sleep(1000, {
    success: true,
    data: 't1 请求通过'
  }); // 模拟异步请求
}, async (ctx) => {
  // KY.logger(ctx.request.fuser);
  return await sleep(1000, {
    success: false,
    data: 't1 请求拦截'
  }); // 模拟异步请求
});

KY.filter('/t1/*', async (ctx) => {
  KY.logger('all t1 children filter');
  return await sleep(1000, {
    success: false,
    data: 't1/* 请求拦截'
  }); // 模拟异步请求
});

KY.filter('/t6', async (ctx) => {
  return Promise.resolve({
    success: false,
    data: 't6 请求拦截'
  });
});
