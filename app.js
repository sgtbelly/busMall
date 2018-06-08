'use strict';

//we need an array of images
// we need a constructor function for products
// we need an event listener
// we need an image repo
// we need to randomize the images
// we need a vote counter
//  we need a view counter
// we need an event handler
// we need to know total clicks
// we need to display the list w/ DOM manipulation
// we need to make sure the images do not repeat
// all the DOM appending

Product.names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wineglass'];

Product.all = [];
Product.container = document.getElementById('image_container');
Product.justViewed = [];
Product.pics = [document.getElementById('left'), document.getElementById('center'), document.getElementById('right')];
Product.tally = document.getElementById('tally');
Product.totalClicks = 0;

function Product(name) {
  this.name = name;
  this.path = 'img/' + name + '.jpg';
  this.votes = 0;
  this.views = 0;
  Product.all.push(this);
}

for(var i = 0; i < Product.names.length; i++) {
  new Product(Product.names[i]);
}

function makeRandom() {
  return Math.floor(Math.random() * Product.names.length);
}

function displayPics() {
  var currentlyShowing = [];
  // make left image unique
  currentlyShowing[0] = makeRandom();
  while(Product.justViewed.indexOf(currentlyShowing[0]) !== -1) {
    console.log('Duplicate, rerun!');
    currentlyShowing[0] = makeRandom();
  }
  // make center image unique
  currentlyShowing[1] = makeRandom();
  while(currentlyShowing[0] === currentlyShowing[1] || Product.justViewed.indexOf(currentlyShowing[1]) !== -1) {
    console.error('Duplicate at center or in prior view! Re run!');
  }

  // make right image unique
  currentlyShowing[2];

  // take it to the DOM one more time
  for(var i = 0; i < 3; i++) {
    Product.pics[i].src = Product.all[currentlyShowing[i]].path;
    Product.pics[i].id = Product.all[currentlyShowing[i]].name;
    Product.all[currentlyShowing[i]].views += 1;
    Product.justViewed[i] = currentlyShowing[i];
  }
}
//a way to click on images
//event handler for keeping track of total clicks on images

function handleClick(event) {
  console.log(Product.totalClicks, 'total clicks');
  // make clicks stop at 25
  if(Product.totalClicks > 24) {
    Product.container.removeEventListener('click', handleClick);
    //show the list after the last click
    showTally();
  }
  //this is how we direct the user to click on a specific image
  if(event.target.id === 'image_container') {
    return alert('Need to click on an image');
  }
  //start to add up the total clicks
  Product.totalClicks += 1;
  for(var i = 0; i < Product.names.length; i++) {
    if(event.target.id === Product.all[i].name) {
      Product.all[i].votes += 1;
      console.log(event.target.id + ' has ' + Product.all[i].votes + ' votes in ' + Product.all[i].views + ' views.');
    }
  }
  displayPics();
}
// Show the tally using the list in the DOM once the event listener has been removed
function showTally() {
  for(var i = 0; i < Product.all.length; i++) {
    var liEL = document.createElement('li');
    liEL.textContent = Product.all[i].name + ' has ' + Product.all[i].votes + ' votes in ' + Product.all[i].views + ' views.';
    //Append the li to the Product.tally created above gloabally for the ul
    Product.tally.appendChild(liEL);
  }
}
//add event listener
Product.container.addEventListener('click', handleClick);