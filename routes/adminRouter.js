const router = require("express").Router();
const auth = require("../middleware/auth");
const adminCtrl = require("../controllers/adminCtrl");
const userCtrl = require("../controllers/userCtrl");

router.get("/get_total_users", auth, adminCtrl.getTotalUsers);
router.get("/get_total_posts", auth, adminCtrl.getTotalPosts);
router.get("/get_total_comments", auth, adminCtrl.getTotalComments);
router.get("/get_total_likes", auth, adminCtrl.getTotalLikes);
router.get("/get_total_spam_posts", auth, adminCtrl.getTotalSpamPosts);
router.get("/get_spam_posts", auth, adminCtrl.getSpamPosts);
router.delete("/delete_spam_posts/:id", auth, adminCtrl.deleteSpamPost);
router.delete("/cancel_spam_posts/:id", auth, adminCtrl.cancelSpamPost);
router.patch("/admin_user", auth, adminCtrl.updateStatusUser);

module.exports = router;
