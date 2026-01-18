const sql = require("mssql");

module.exports = async function (context, req) {
  try {
    context.log("Connecting to SQL...");

    const pool = await sql.connect(process.env.SQL_CONNECTION_STRING);

    context.log("Connected. Running query...");

    const result = await pool
      .request()
      .query(
        "SELECT TOP 5 Text, CreatedAt FROM Messages ORDER BY CreatedAt DESC"
      );

    context.res = {
      status: 200,
      body: result.recordset
    };
  } catch (error) {
    context.log("SQL ERROR:", error);

    context.res = {
      status: 500,
      body: {
        error: error.message
      }
    };
  }
};
