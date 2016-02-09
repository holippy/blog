/*===========================

background

===========================*/

var bg = require('./_bg.js');

var bgAnime = new bg([
  '/assets/svg/layer1.svg',
  '/assets/svg/layer2.svg',
  '/assets/svg/layer3.svg',
  '/assets/svg/layer4.svg',
  '/assets/svg/layer5.svg',
  '/assets/svg/layer6.svg',
  '/assets/svg/layer7.svg'
  ]);

//bgAnime.svgLoad();

/*===========================

contents

===========================*/

//window.mixin = require('./_mixin.js');
var articleJSX = require('./_article.jsx');
var menuJSX = require('./_menu.jsx');

var aa = ()=>{
  const num = 0;
  let string = 'aa';
  var numnum = 10;
}

//var Userbox= require('./demo/userbox.jsx');



// var Dispatcher = require('flux').Dispatcher;
// var EventEmitter = require('events').EventEmitter;
// var assign = require('object-assign');


// var flightDispatcher = new Dispatcher();

// var articleDispatcher = new Dispatcher();

// // Keeps track of which country is selected
// // どの国が選択されたか記録する
// var CountryStore = {country: null};

// // Keeps track of which city is selected
// // どの都市が選択されたか記録する
// var CityStore = {city: null};

// // Keeps track of the base flight price of the selected city
// // 選択された都市の基本飛行料金を記録する
// var FlightPriceStore = {price: null};

// flightDispatcher.dispatch({
//   actionType: 'city-update',
//   selectedCity: 'paris'
// });

// var ArticleStore = {data: null};
// var PagerStore = {data: null};

// // articleDispatcher.dispatch({
// //   actionType: 'latest',
// //   page: 1
// // });

// flightDispatcher.register(function(payload) {
//   if (payload.actionType === 'city-update') {
//     CityStore.city = payload.selectedCity;
//   }
// });

// articleDispatcher.register(function(payload) {
//   if (payload.actionType === 'latest') {
//     ArticleStore.pager = payload.page;
//   }
// });

// flightDispatcher.dispatch({
//   actionType: 'country-update',
//   selectedCountry: 'australia'
// });

// // articleDispatcher.dispatch({
// //   actionType: 'category',
// //   page: 1
// // });

// CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
//   if (payload.actionType === 'country-update') {
//     CountryStore.country = payload.selectedCountry;
//   }
// });

// CityStore.dispatchToken = flightDispatcher.register(function(payload) {
//   if (payload.actionType === 'country-update') {
//     // `CountryStore.country` may not be updated.
// 　　// `CountryStore.country`はアップデートされないかもしれない
//     flightDispatcher.waitFor([CountryStore.dispatchToken]);
//     // `CountryStore.country` is now guaranteed to be updated.
// 　　// `CountryStore.country`は今アップデートされることを保証される

//     // Select the default city for the new country
// 　　// 新しい国のためのデフォルトの都市を選択する
//     CityStore.city = getDefaultCityForCountry(CountryStore.country);
//   }
// });

// ArticleStore.dispatchToken = articleDispatcher.register(function(payload) {

//   payload.callback('loaded1')

//   if (payload.actionType === 'latest') {
//     ArticleStore.data = payload.page;
//   }
// });

// PagerStore.dispatchToken = articleDispatcher.register(function(payload) {

//   payload.callback('loaded2')

//   if (payload.actionType === 'latest') {
//     ArticleStore.data = payload.page;
//   }
// });


// FlightPriceStore.dispatchToken =
//   flightDispatcher.register(function(payload) {
//     switch (payload.actionType) {
//       case 'country-update':
//       case 'city-update':
//         flightDispatcher.waitFor([CityStore.dispatchToken]);
//         FlightPriceStore.price =
//           getFlightPriceStore(CountryStore.country, CityStore.city);
//         break;
//   }
// });


// //view
// var Article = React.createClass({

//   getInitialState: function(){
//     return {
//       data: 1
//     };
//   },

//   componentWillUpdate: function(){


//   },

//   dataloaded: function(data){
//     console.log(data);

//   },

//   actionCreator: function(){
//     articleDispatcher.dispatch({
//       actionType: 'latest',
//       page: 1,
//       callback: this.dataloaded
//     });
//   },

//   render:function(){
//     return(
//       <p onClick={this.actionCreator}>text text</p>
//     );
//   }
// });

// ReactDOM.render(
//   <Article/>,
//   document.getElementById('example')
// );

// //Dispatcher
// var appDispatcher = assign(new Dispatcher(), {
//     handleServerAction: function (action) {
//         this.dispatch({
//             source: 'server',
//             action: action
//         })
//     }
// });



