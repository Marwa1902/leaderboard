const express = require('express');
const { submitScore, getLeaderboard, getUserRank } = require('../controllers/leaderboardController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/submit_score', auth, submitScore);
router.get('/leaderboard/:gameId', getLeaderboard);
router.get('/my_rank/:gameId', auth, getUserRank);

module.exports = router;
