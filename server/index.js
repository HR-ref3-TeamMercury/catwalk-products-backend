require('newrelic');
const express = require('express');
const parser = require('body-parser');
const app = express();
const port = 5000;
const query = require('../database/querys.js')

app.use(parser.json());
// app.use(express.static(path.join(__dirname, '..', 'public')));


app.get('/getProducts', function (req, res) {
  query.getProducts()
    .then((data) => {

      res.send(data)
    })
    .catch((error) => {
      console.log('we did not get Products using get request')
      res.status(404)
      res.end()
    })
});

 app.get('/getRelatedProducts', function (req, res) {
    query.getRelated()
      .then((data) => {
      var relatedArray = []
        for(var i = 0; i < data.length; i++){
          relatedArray.push(data[i]['related_product_id'])
        }
        res.send(relatedArray)
      })
      .catch((error) => {
        console.log('we did not get Photos using get request')
        res.status(404)
        res.end()
      })
  });


app.get('/getProductInformation', function (req, res) {
  var productInfo = null;
  var currProductId = null;
  query.getProducts()
  .then((data) => {
  productInfo = data;
   currProductId = data[0]['id'];
  return query.getFeatures(currProductId)
  })
    .then((feats) => {

      var fullProduct = {
        'id': productInfo[0]['id'],
        'name': productInfo[0]['name'],
        'description': productInfo[0]['description'],
        'category': productInfo[0]['category'],
        'default_price': productInfo[0]['default_price'].toString(),
        'features': feats
      }
      res.send(fullProduct)
    })
    .catch((error) => {
      console.log('we did not get Products using get request')
      res.status(404)
      res.end()
    })
});


app.get('/getProductStyles', function (req, res) {
  var style = null;
  var photos = null;
  var styleIds = [];
  var styleFormatted = [];
  query.getStyles()
    .then((styledata) => {
      style = styledata;
      for (var i = 0; i < styledata.length; i++) {
        styleIds.push(styledata[i]['id'])
      }
      return query.getPhotos(styleIds)
    })
    .then((Photodata) => {
      photos = Photodata;
      return query.getSkus(styleIds)
    })
    .then((skus) => {

      for (var i = 0; i < style.length; i++) {
        var photosArray = [];
        for(var m = 0; m < photos.length; m++) {
          if(style[i]['id'] === photos[m]['style_id']){
          var photosObject = {
            'thumbnail_url': photos[m]['thumbnail_url'],
            'url': photos[m]['url']
          };
          photosArray.push(photosObject)
        }
      }
      var skusObject = {};
      for(var p = 0; p < skus.length; p++) {
        if(style[i]['id'] === skus[p]['style_id']){
          var skusId = skus[p]['id']
          skusObject[skusId] = {
            'quantity': skus[p]['quantity'],
            'size': skus[p]['size']
        }
        };
      }
      var salePrice = style[i]['sale_price'];
      if(salePrice === 'null'){
        salePrice = 0;
      }
      var isDefault = false;
      if(style[i]['default_style'] === 1){
        isDefault = true;
      }
        var styleObject = {
          'style_id': style[i]['id'],
          'name': style[i]['name'],
          'original_price': style[i]['original_price'].toString(),
          'sale_price': salePrice.toString(),
          'default?': isDefault,
          'photos': photosArray,
          'skus': skusObject
        }
        styleFormatted.push(styleObject);
      }
      var result = {
        product_id: style[0]['product_id'].toString(),
        results: styleFormatted,
      }
      res.send(result)
    })
    .catch((error) => {
      console.log('we did not get Style susing get request')
      res.status(404)
      res.end()
    })
});


// app.get('/getFeatures', function (req, res) {
//   query.getFeatures()
//     .then((data) => {
//       console.log('we got the data from the database', data)
//       res.send(data)
//     })
//     .catch((error) => {
//       console.log('we did not get Features using get request')
//       res.status(404)
//       res.end()
//     })
// });
// app.get('/getPhotos', function (req, res) {
//   query.getPhotos()
//     .then((data) => {
//       console.log('we got the data from the database', data)
//       res.send(data)
//     })
//     .catch((error) => {
//       console.log('we did not get Photos using get request')
//       res.status(404)
//       res.end()
//     })
// });


// app.get('/getSkus', function (req, res) {
//   query.getSkus()
//     .then((data) => {
//       console.log('we got the data from the database', data)
//       res.send(data)
//     })
//     .catch((error) => {
//       console.log('we did not get Skus using get request')
//       res.status(404)
//       res.end()
//     })
// });




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})