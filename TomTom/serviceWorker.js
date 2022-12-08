/*-----------SERVICE WORKER--------------------*/ 
var CACHE_NAME = "tomtom-cache-v1";
var assets = [
	"./index.html",
	"./",
	"./css/styles.css"
];	


// Add Caches
self.addEventListener( "install", function (evt){
	//evt.skipWaiting();
	// Perform install steps
	evt.waitUntil(
		caches.open(CACHE_NAME).then(function(cache){
			return cache.addAll(assets);
		})
	);
});

// Log in  console the status of serviceWorker(keep clean)
self.addEventListener('activate',function (evt){
	console.log("service worker has been activated!");
	var cacheWhiteList = [CACHE_NAME];
	evt.waitUntil(
		// Check every keys in the cache
		caches.keys().then((keys) =>{
			return Promise.all(
				keys.map(function(key){
					if(cacheWhiteList.indexOf(key) === -1){
						return caches.delete(key);
					}
				})
			);
		})
	)
});

// Load the caches ressource
self.addEventListener("fetch", function (evt){
	evt.respondWith(
		caches.match(evt.request).then(function (response){
			// Cacche hit -return Response
			if(response){
				return response;
			}
			// IMPORTANT: Clown the request
			// FR(Une requête est n flux et est à consommation unique)
			// FR(Il est donc nécéssaire de copier la requête pour pouvoir l'utiliser...)
			var fetchRequest = evt.request.clone();

			return fetch(fetchRequest).then(
				function (response) {
					if((!response) || (response.status !== 200) || (response.type !== "basic")){
						return response;
					}

					// IMPORTANT: The same reason as the previous but to put in the caches
					var responseToCache = response.clone();
					caches.open(CACHE_NAME).then(function (cache) {
						cache.put(evt.request, responseToCache);
				});

				return response;
			})
		})
	);
});

// the PUSH system part
self.addEventListener('push', (event) => {
	const data = event.data ? event.data.json() : {};
	event.waitUntil(
		self.registration.showNotification(data.title, {
			icon: "./assets/192.jpg",
			body: data.message,
			data: data,
		})
	)
});

// Redirect the user after he clicked on the pop-up
self.addEventListener('notificationclick', (event) => {
	event.notification.close();
	event.waitUntil(
		openUrl('http://localhost/tomtom')
	);
	
});

// Check if one tab is already open
async function openUrl(url){
	const windowClients = await self.clients.matchAll({type: 'window', includeUncontrolled: true});
	for (let i = 0; i < windowClients.length;  i++) {
		const client = windowClients[i];
		if(client.url === url && 'focus' in client){
			return client.focus();
		}
	}
	if(self.clients.openWindow){
		return self.clients.openWindow(url);
	}
	return null;
}