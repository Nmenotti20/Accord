const router = require("express").Router();
const businessesController = require("../../controllers/businessesController");
const passport = require('passport');
const authenticate = passport.authenticate('businessStrategy', { session: false });
const upload = require('../../config/middleware/multer');

// Matches with "/api/books"
router.route("/login")
  .post(businessesController.login)

router.route("/register")
  .post(upload.single('picture'), businessesController.register);

router.route("/profile")
  .get(authenticate, businessesController.find)
  .put(authenticate, businessesController.updateBiz);

router.route('/reviews')
  .get(authenticate, businessesController.allReviews);

router.route('/posts')
  .get(authenticate, businessesController.allPosts)
  .post(authenticate, businessesController.makePost)
  .delete(authenticate, businessesController.deletePost)
  .put(authenticate, businessesController.editPost);


  router.route('/bizReply')
    .post(authenticate, businessesController.makeReply);


module.exports = router;