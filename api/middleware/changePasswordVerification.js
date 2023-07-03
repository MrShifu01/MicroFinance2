function changePasswordVerification(req, res, next) {
    if (
      req.body.newPassword == req.body.confirmPassword &&
      req.body.newPassword.length >= 6 ){
        req.newUserpassword = req.body.newPassword;
        next();
        } else if (req.body.newPassword.length < 6) {
        res.status(400).send({
            message: "The new password needs to be longer than six characters.",
        });
            next();
            } else {
            res.status(400).send({
                message: "Conformation Password and New Password does not match.",
        });
        next(); }
}

module.exports = changePasswordVerification