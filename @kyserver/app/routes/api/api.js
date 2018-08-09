
KY.onGet('/api/getUserInfo', async (ctx) => {
  ctx.send({
    name: 'rgy',
    address: 'chong qing, yu bei, ci zhu'
  });
});
