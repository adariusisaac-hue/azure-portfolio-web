const sql = require("mssql");

module.exports = async function (context, req) {
  try {
    // Connect to Azure SQL using the app setting
    const pool = await sql.connect(process.env.SQL_CONNECTION_STRING);

    // Query the Messages table
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
    context.res = {
      status: 500,
      body: {
        error: "Database query failed"
      }
    };
  }
};

