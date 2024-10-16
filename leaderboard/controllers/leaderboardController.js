const redis = require('../config/db');

// Submit Score
exports.submitScore = async (req, res) => {
    const { gameId, score } = req.body;
    const userId = req.user; // Extracted from the token.
    await redis.zadd(`leaderboard:${gameId}`, score, `user:${userId}`);
    res.status(200).json({ message: 'Score submitted' });
};

// Get Leaderboard
exports.getLeaderboard = async (req, res) => {
    const { gameId } = req.params;
    const leaderboard = await redis.zrevrange(`leaderboard:${gameId}`, 0, 9, 'WITHSCORES');
    res.status(200).json({ leaderboard });
};

// Get User Rank
exports.getUserRank = async (req, res) => {
    const { gameId } = req.params;
    const userId = req.user;
    const rank = await redis.zrevrank(`leaderboard:${gameId}`, `user:${userId}`);
    res.status(200).json({ rank: rank !== null ? rank + 1 : 'Not ranked' });
};
