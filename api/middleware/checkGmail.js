function checkGmail(req, res, next) {
    const { email } = req.body
    if (email.endsWith('@gmail.com')) {
        next()
    } else {
        res.status(400).json("Must be a gmail address")
    }
}

module.exports = checkGmail