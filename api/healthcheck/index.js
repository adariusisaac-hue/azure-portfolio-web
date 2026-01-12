module.exports = async function (context, req) {
  context.res = {
    status: 200,
    body: {
      status: "ok",
      message: "Static Web App API is running"
    }
  };
};
