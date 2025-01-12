async function healthCheckController(req, res) {
  try {
    if (req.method !== "GET") {
      return res
        .status(405)
        .json({ message: "Method Not Allowed", error: true, success: false });
    }

    res.status(200).json({
      status: "Healthy",
      message: "API is up and running!",
      error: false,
      success: true,
    });
  } catch (err) {
    console.error("Health check error:", err.message || err);
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
      error: true,
      success: false,
    });
  }
}

module.exports = healthCheckController;
