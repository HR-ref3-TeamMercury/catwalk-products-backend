var mysql = require('mysql');
var bluebird = require('bluebird')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'SDC'
})

connection.connect()

const pq = bluebird.promisify(connection.query).bind(connection)

var getProducts = () => {
  return pq('SELECT * FROM products WHERE id = ?', ['5']);
};

var getFeatures = (prodId) => {
  return pq('SELECT feature, value FROM features WHERE product_id = ?', [prodId]);
};





var getStyles = () => {
  return pq('SELECT * FROM styles WHERE product_id = ?', ['19089'])
};
// first on actual product id
var getPhotos = (styleIds) => {
  var styleMarks = '';
  for (var i = 0; i < styleIds.length; i++) {
    if(i === (styleIds.length -1)){
    styleMarks += '?';
    } else {
      styleMarks += '?,'
    }
  }
  return pq('SELECT * FROM photos WHERE style_id in ('+ styleMarks+ ')', styleIds);
};
// put index on where photo and style id link up

var getSkus = (styleIds) => {
  var styleMarks = '';
  for (var i = 0; i < styleIds.length; i++) {
    if(i === (styleIds.length -1)){
    styleMarks += '?';
    } else {
      styleMarks += '?,'
    }
  }
  return pq('SELECT * FROM skus WHERE style_id in ('+ styleMarks+ ')', styleIds);
};


var getRelated = () => {
  return pq('SELECT related_product_id FROM related WHERE product_id = ?', ['1']);
};







module.exports.getRelated = getRelated
module.exports.getProducts = getProducts
module.exports.getPhotos = getPhotos
module.exports.getFeatures = getFeatures
module.exports.getStyles = getStyles
module.exports.getSkus = getSkus
