const path = require('path');

/**
 * 路由匹配 执行 filter
 * @returns [callback,]
 */
function routeMatch(filters, url) {
  var cbs = [];
  url = url.toLowerCase();
  for (var path in filters) {
    path = path.toLowerCase();
    var cb = filters[path];
    if (path.match(/.*\/\*$/)) {
      var tmp = path.slice(0, -1);
      var regx = new RegExp(tmp);
      if (url.match(regx)) {
        cbs = cbs.concat(cb);
      }
    } else {
      if (path == url) {
        cbs = cbs.concat(cb);
      }
    }
  }
  return cbs;
}

module.exports = (KY) => {
  require(path.join(KY.appDir, '/app/filter.js'));

  return async (ctx, next) => {
    // 为 ctx 注册 send 方法
    ctx.send = function(json) {
      ctx.response.body = json;
    }

    var cbs = routeMatch(KY.filters, ctx.request.path);

    if(cbs.length > 0) {
      var count = 0;
      for(var i = 0, len = cbs.length; i < len; i++) {
        try {
          var r = await cbs[i](ctx);
          if(r.success) {
            count++;
          }else{
            ctx.body = r.data;
            return;
          }
        } catch(e) {
          console.log(e);
          KY.logger('error, 过滤器执行失效');
          await next();
        }
      }
      // filter 全部通过才进行下一步
      if(count == cbs.length) {
        await next();
      }
    }else{
      await next();
    }
  }
}
