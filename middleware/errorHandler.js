let errorHandler = (err, req, res, next) => {
     console.log(err);
     return res.status(404).json({error: err.message});
};

module.exports = errorHandler;