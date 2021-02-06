let global_url = "https://shopping-cart-server-55.herokuapp.com"


// Remove Items From Cart
$('a.remove').click(function(){
  $( this ).parent().parent().parent().hide(500);

})

$('a.btn.continue').click(function(){
	console.log('keep shopping and select the following items')
    window.alert('The following items are in your cart now.')
$('li.items').show(400);
})

$('a.btn.checkout').click(function(){
    console.log('checkout...')
    url = global_url + "/api/item/cost/0.13&"
        if (promo) {
            url += 0.1;
        }else{
            url += 0;
        }
        fetch(url, {
            method: 'GET'
        }).then(function(response) {
            return response.json();
            })
            .then(function(myJson) {
                window.alert('You are checking out. The total price is: $' + parseFloat(myJson.total).toFixed(2));            
            })
})


let promo = false;

$('a.btn.promo').click(function(){
  let code = document.getElementById('promo').value;
  console.log(code);
  if (code == 'CSC301') {
  	window.alert('Promo Code is applied! You got 10% discount!')
  	promo = true;
    asyncUpdateAll(200);
  }else{
  	window.alert('Invalid promo code. Please try again!')
  }
 
})


 //get count from items

function setCountPrice(e, num, name, price, stock){
    if(e.keyCode === 13){
        try{
            let count = 0;
    	 	// let price = 0;
    	 	count = parseFloat(document.getElementById(num).value);
    	 	
    		let in_stock = document.getElementById(stock).textContent;
    		// console.log(in_stock == ' In Stock')
    		if (in_stock == ' In Stock'){in_stock = true; }else{in_stock = false}
    		
    	 	let json = {
    		    "name": document.getElementById(name).textContent,
    		    "price": document.getElementById(price).textContent,
    		    "quantity": count,
    		    "stock": in_stock
    		}

    	 	fetch(global_url + "/api/item/put", {
    	 		method: 'PUT',
    	 		body: JSON.stringify(json),
    	 		headers: new Headers({
    			    'Content-Type': 'application/json'
    			  })
    	 	}).then(response => {console.log(response)})
    	 	.then(response => {
    	 		setItemPrice('item1', 'total1');
    			setItemPrice('item2', 'total2');
    			setItemPrice('item3', 'total3');
    			setItemPrice('item4', 'total4');
    			document.getElementById(num).placeholder = count;

            })

            // console.log(count, price, sum);
            url = global_url + "/api/item/cost/0.13&"
            if (promo) {
            	url += 0.1;
            }else{
            	url += 0;
            }
            fetch(url, {
            	method: 'GET'
            }).then(function(response) {
    		    return response.json();
    		  })
    		  .then(function(myJson) {
    		  	// console.log(myJson)
                console.log('here' + myJson.subtotal)
    		    document.getElementById('subtotal').textContent = '$ ' + parseFloat(myJson.subtotal).toFixed(2);
    		    document.getElementById('tax').textContent = '$ ' + parseFloat(myJson.tax).toFixed(2);
    		    document.getElementById('discount').textContent = '$ ' + '-' + parseFloat(myJson.discount).toFixed(2);
    		    document.getElementById('checkout').textContent = parseFloat(myJson.total).toFixed(2);
    		    // document.getElementById('checkout').textContent = (myJson.cost).toFixed(2);
    		    setItemPrice('item1', 'total1');
    			setItemPrice('item2', 'total2');
    			setItemPrice('item3', 'total3');
    			setItemPrice('item4', 'total4');
    			document.getElementById(num).placeholder = count;
    		    
        	   })
            asyncUpdateAll(200);
            

    	} catch (err) {
            console.log('missing item/items but it is fine.');
        }
    }
}

function setCountPriceToZero(remove, num, name, price, stock){
    
    try{

        let count = 0;
        
        let in_stock = document.getElementById(stock).textContent;
        // console.log(in_stock == ' In Stock')
        if (in_stock == ' In Stock'){in_stock = true; }else{in_stock = false}
        
        let json = {
            "name": document.getElementById(name).textContent,
            "price": document.getElementById(price).textContent,
            "quantity": count,
            "stock": in_stock
        }
        // console.log(json)


        fetch(global_url + "/api/item/put", {
            method: 'PUT',
            body: JSON.stringify(json),
            headers: new Headers({
                'Content-Type': 'application/json'
              })
        }).then(response => {console.log(response)})


        // console.log(count, price, sum);
        url = global_url + "/api/item/cost/0.13&"
        if (promo) {
            url += 0.1;
        }else{
            url += 0;
        }
        fetch(url, {
            method: 'GET'
        }).then(function(response) {
            return response.json();
          })
          .then(function(myJson) {

            document.getElementById('subtotal').textContent = '$ ' + parseFloat(myJson.subtotal).toFixed(2);
            document.getElementById('tax').textContent = '$ ' + parseFloat(myJson.tax).toFixed(2);
            document.getElementById('discount').textContent = '$ ' + '-' + parseFloat(myJson.discount).toFixed(2);
            document.getElementById('checkout').textContent = parseFloat(myJson.total).toFixed(2);


            
           })
        asyncUpdateAll(200);
    } catch (err) {
        console.log('missing item/items but it is fine.');
    }
    

}


function setItemPrice(item_name, num){
	url = global_url + "/api/item/get/" + item_name;
	fetch(url, {
		method: 'GET'
	}).then(function(response) {
		return response.json();
	}).then(function(myJson) {
		// console.log(myJson)
        if (document.getElementById(num) != null){
		  document.getElementById(num).textContent = (myJson[0].price * myJson[0].quantity).toFixed(2);

        }
	})
}


function updateAll() {

    try {

    	fetch( global_url + "/api/item/get", {
     		method: 'GET'
     	}).then(function(response) {
    	    return response.json();
    	  })
    	  .then(function(myJson) {
    	  	// console.log(document.getElementById('first'))
            if (document.getElementById('first') != null) {

        	  	document.getElementById('first').placeholder = myJson[0].quantity;
        	    
            	document.getElementById('name1').textContent = myJson[0].name;
            	
            	document.getElementById('price1').textContent = myJson[0].price;
            	
            	if (myJson[0].stock) {
            		
            		document.getElementById('stock1').textContent = ' In Stock';
            		document.getElementById('stock1').className = 'stockStatus'} 

            	else {
            		document.getElementById('stock1').textContent = ' Out Of Stock';
            		document.getElementById('stock1').className = 'stockStatus out'}
            }

            if (document.getElementById('second') != null) {

            	document.getElementById('second').placeholder = myJson[1].quantity;

            	document.getElementById('name2').textContent = myJson[1].name;
            	
            	document.getElementById('price2').textContent = myJson[1].price;
            	
            	if (myJson[1].stock) {
            		document.getElementById('stock2').textContent = ' In Stock';
            		document.getElementById('stock2').className = 'stockStatus'} 

            	else {
            		document.getElementById('stock2').textContent = ' Out Of Stock';
            		document.getElementById('stock2').className = 'stockStatus out'}
            }

            if (document.getElementById('third') != null) {

            	document.getElementById('third').placeholder = myJson[2].quantity;

            	document.getElementById('name3').textContent = myJson[2].name;
            	
            	document.getElementById('price3').textContent = myJson[2].price;
            	
            	if (myJson[2].stock) {
            		document.getElementById('stock3').textContent = ' In Stock';
            		document.getElementById('stock3').className = 'stockStatus'} 

            	else {
            		document.getElementById('stock3').textContent = ' Out Of Stock';
            		document.getElementById('stock3').className = 'stockStatus out'}

            }

            if (document.getElementById('forth') != null) {

            	document.getElementById('forth').placeholder = myJson[3].quantity;

            	document.getElementById('name4').textContent = myJson[3].name;
            	
            	document.getElementById('price4').textContent = myJson[3].price;
            	
            	if (myJson[3].stock) {
            		document.getElementById('stock4').textContent = ' In Stock';
            		document.getElementById('stock4').className = 'stockStatus'} 

            	else {
            		document.getElementById('stock4').textContent = ' Out Of Stock';
            		document.getElementById('stock4').className = 'stockStatus out'}
            }

    	    })
        }catch (err) {
            console.log('missing item/items but it is fine.');
        }

}
updateAll();

function asyncUpdateAll(interval){

    try{
        let timer = setInterval(function(){ 
        updateAll(); 
        url = global_url + "/api/item/cost/0.13&"
            if (promo) {
            	url += 0.1;
            }else{
            	url += 0;
            }
            fetch(url, {
            	method: 'GET'
            }).then(function(response) {
        	    return response.json();
        	  })
        	  .then(function(myJson) {
        	  	// console.log(myJson)
        	    document.getElementById('subtotal').textContent = '$ ' + parseFloat(myJson.subtotal).toFixed(2);
        	    document.getElementById('tax').textContent = '$ ' + parseFloat(myJson.tax).toFixed(2);
        	    document.getElementById('discount').textContent = '$ ' + '-' + parseFloat(myJson.discount).toFixed(2);
        	    document.getElementById('checkout').textContent = parseFloat(myJson.total).toFixed(2);
        	    // document.getElementById('checkout').textContent = (myJson.cost).toFixed(2);
        	    setItemPrice('item1', 'total1');
        		setItemPrice('item2', 'total2');
        		setItemPrice('item3', 'total3');
        		setItemPrice('item4', 'total4');
                clearTimeout(timer)

        	    
        })
        }, interval);
    } catch (error){
        console.log('Missing item/items, but it is fine.');
    }

}

asyncUpdateAll(500);