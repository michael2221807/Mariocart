// Remove Items From Cart
$('a.remove').click(function(){
  event.preventDefault();
  $( this ).parent().parent().parent().hide( 400 );
 
})

// Just for testing, show all items
  $('checkout').click(function(){
  	console.log('continue...')
    $('li.items').show(400);
  })
  

 //get count from items

 function getCount() {
 	var count = 0;
 	count = document.getElementById("first").value;
 	console.log("Count: " + count);
 }