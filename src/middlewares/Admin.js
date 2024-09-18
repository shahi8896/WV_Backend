export function checkAdmin(req, res, next) {
    // const {id} = req.params
    const user = req.body;
    console.log("user id", user);
    if (user && user.role === '6673da11e04d558f55ab7287') {
        next(); // user is admin, proceed to the next middleware or route handler
    }
    else {
        res.status(403).json({ message: 'Forbidden: Admins only.' });
    }
}
