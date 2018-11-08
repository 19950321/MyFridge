var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};

var renderHomepage = function(req, res, responseBody){
    var message;
    if (!(responseBody instanceof Array)) {
      message = "API lookup error";
      responseBody = [];
    } else {
      if (!responseBody.length) {
        message = "No Food Items found";
      }
    }
    res.render('foodlist', {
      title: 'Food List',
      foods: responseBody,
      message: message
    });
  };
  

module.exports.getHomeList = function(req, res){
    var requestOptions, path;
    path = '/api/food';
    requestOptions = {
      url : apiOptions.server + path,
      method : "GET",
      json : {},
      qs : {}
    };
    request(
      requestOptions,
      function(err, response, body) {
        renderHomepage(req, res, body);
      }
    );
  };

  module.exports.foodDelete = function(req, res){
    var requestOptions, path;
    path = '/api/food/' + req.params.id;
    requestOptions = {
      url : apiOptions.server + path,
      method : "DELETE",
      json : {},
      qs : {},
      params : {id: req.params.id}
    };
    request(
      requestOptions,
      function(err, response, body) {
        res.redirect('/');
      }
    );
  }

  module.exports.createFood = function(req, res){
    res.render('food-create', {
      title: 'Create Food Item',
      edit: false,
      food: {
        name: '',
        date: '',
        expiry: '',
        left_overs: false,
        quantity: 1
      }
    });
  } 

  module.exports.Edit = function(req, res){
    console.log("GET CALLED");
    var requestOptions, path;
    path = '/api/food/' + req.params.id;
    requestOptions = {
      url : apiOptions.server + path,
      method : "GET",
      json : {},
      qs : {},
      params : {id: req.params.id}
    };
    request(
      requestOptions,
      function(err, response, body) {
        var data;
        data = body;
        if (response.statusCode === 200 && data) {
          var result = data[0];
          result.date = formatDate(result.date);
          if (result.expiry){
            result.expiry = formatDate(result.expiry);
          }
          res.render('food-create', {
            title: 'Modify Food Item',
            edit: true,
            food: result
          });
        }
      }
    );
  }
  
  module.exports.create_item = function(req, res){
    var requestOptions, path;
    path = '/api/food';
    if (req.body.left_overs == 'on')
      req.body.left_overs = true;
    requestOptions = {
      url : apiOptions.server + path,
      method : "POST",
      json : req.body,
    };
    request(
      requestOptions,
      function(err, response, body) {
        res.redirect('/');
      }
    );
  }

  module.exports.putItem = function(req, res){
    var requestOptions, path;
    path = '/api/food/' + req.params.id;
    if (req.body.left_overs == 'on')
      req.body.left_overs = true;
    requestOptions = {
      url : apiOptions.server + path,
      method : "PUT",
      json : req.body
    };
    request(
      requestOptions,
      function(err, response, body) {
        res.redirect('/');
      }
    );
  }

  function formatDate(date){
    var d = new Date(date);
    var day =  d.getDate();
    if (day < 10)
      day = '0' + day;
    var month =  parseInt(d.getMonth()+ 1);
    if (month < 10)
      month = '0' + month;
    return d.getFullYear() + '-'+ month + '-' + day;
  }