var express = require('express');
var router = express.Router();
const authService = require('../services/authServices')
/* GET users listing. */
router.post('/', function (req, res, next) {
  let login = authService.Login(req.body, function (err, result) {
    if (err)
      res.send(err)
    res.send(result);
  })
});


module.exports = router;
