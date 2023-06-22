const router = require('express').Router();
const {
  // getSingleUser,
  createUser,
  login,
  saveBook,
  deleteBook
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(authMiddleware, createUser);

router.route('/book').put(authMiddleware, saveBook);

router.route('/login').post(authMiddleware, login);

// router.route('/me').get(authMiddleware, getSingleUser);

router.route('/books/:bookId').delete(authMiddleware, deleteBook);

module.exports = router;