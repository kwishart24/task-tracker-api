const { Router } = require("express");
const mongoose = require("mongoose");

function healthRouter() {
  const router = Router();

  router.get("/check", (req, res) => {
    //check mongoDB connection status
    const dbState = mongoose.connection.readyState;

    const dbStatus = dbState === 1 ? "connected" : "disconnected";

    console.log(dbStatus);

    const healthData = {
      database: dbStatus,
      uptime: process.uptime(),
      timestamp: new Date(),
    };

    if (dbState !== 1) {
      //Return 503 Service Unavailable if database is down
      return res.status(503).json(healthData);
    }

    //Return 200 OK if everything is working
    res.status(200).json(healthData);
  });

  return router;
}
module.exports = { healthRouter };
