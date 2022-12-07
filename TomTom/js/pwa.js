if( 'serviceWorker' in navigator ){
	navigator.serviceWorker.register('./serviceWorker.js').then(registration =>{
		console.log("SW registered");
	}).catch((error) =>{
		console.log("SW registration failed ! Erreur : " + error);
	});
}