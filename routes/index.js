
/*
 * GET home page.
 */
module.exports

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};