const db = require("../../utils/database");
const query = "SELECT * FROM schedule WHERE user_id = ? "
exports.getSchedule = (req, res) => {
    db.query(
        query, [req.params.userId],
        (err, results, fields) => {
            if (!err) {
                res.send(results);
            } else {
                console.log(err);
            }
        }
    );

};