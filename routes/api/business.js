const router = require("express").Router();
const businessesController = require("../../controllers/businessesController");
const passport = require('passport');
const authenticate = passport.authenticate('businessStrategy', { session: false });

// Matches with "/api/books"
router.route("/login")
  .get(businessesController.login)

router.route("/register")
  .post(businessesController.register);

router.route("/isloggedin")
  .get(authenticate, businessesController.find);

router.route('/reviews')
  .get(authenticate, businessesController.allReviews);

// router.route("/makePost")
//   .post(businessesController.makePost);
// Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

module.exports = router;