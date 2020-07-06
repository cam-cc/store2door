const foods = [
    {
      name: 'Romesco Salmon',
      price: '$12',
      pic: '../images/salmon.png',
      id: '1'
      // https://www.balenciaga.com/us/men/shoes
    },
    {
        name: 'Veggie Bean Salad',
        price: '$10.95',
        pic: '../images/tacosalad.png',
        id: '2'
        // https://www.adidas.com/us/yeezy
      },
      {
        name: 'Pesto Shrimp',
        price: '$8.99',
        pic: '../images/shrimp.png',
        id: '3'
        // https://www.valentino.com/en-us/low-top-sneakers_cod7789028784782122.html
      },
      {
        name: 'Italian Spaghetti',
        price: '$11.49',
        pic: '../images/spaghetti.png',
        id: '4'
        // https://stockx.com/nike-air-more-uptempo-supreme-red
      }
  ];
let main_div = document.getElemenyByID("main_div");

  function foodlist(data){
    for (let c of data){
      var img1_div = document.createElement("div");
      var imageContainer = document.createElement("img");

      imageContainer.setAttribute("src", c.pic);

      img1_div.appendchild(imageContainer);
      main_div.appendchild(img1_div);
      var desc = document.createElement("div");
      desc.textContent = c.name;
      main_div.appendchild(desc);
    }
  }
