module.exports = () => {
  return async (ctx, next) => {
    if (ctx.path === '/') {
      ctx.status = 200;
      ctx.type = 'html';
      ctx.body = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta http-equiv="refresh" content="0; URL='/admin/content-manager'" />
            <script>
              window.location.replace('/admin/content-manager');
            </script>
          </head>
          <body>
            <p>Redirecting to <a href="/admin/content-manager">/admin/content-manager</a>...</p>
          </body>
        </html>
      `;
    } else {
      await next();
    }
  };
};
