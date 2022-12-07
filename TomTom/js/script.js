/*----------------script file start here---------------------*/
window.addEventListener("load", () =>{
    //Before get and set search result, access to user location
    findMyPosition();
    //let user control the map
    setControlsMap();
});
/*-------API KEYS------*/
const keys = {
    key: "<your_tomtom_api_code_here>"
}

/*-------CONTROLLERS PARAMS----*/
var MADRID = [-3.703790, 40.416775]
var LOME = [1.22311, 6.13365]
var DEFAULT_LOCATION = [1.1641062, 6.2044845]
var moveMap = function(lnglat){
    map.flyTo({
        center: lnglat,
        zoom: 14
    })
}
var handleResults = function(result){
    console.log(result);
    if(result.results){
        moveMap(result.results[0].position);
        console.log(result.results[0].position);
    }
}

/*------------DEFINITION OF ROUTE | MAP | TRIP-----*/
//Add new map
function newMap(key, container, center, zoom){
    var tmp = tt.map({
        key: key,
        container: container,
        center: center,
        zoom: zoom,
        style: "tomtom://vector/1/basic-main",
        dragPan: !isMobileOrTablet()
    });
    //temporary variable to get map object
    return tmp;
}
// var map = newMap(keys.key, "map", DEFAULT_LOCATION, 13.5);

//is mobile or tablet
function isMobileOrTablet(){var i,a =!1;return i=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(i)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(i.substr(0,4)))&&(a=!0),a}window.isMobileOrTablet=window.isMobileOrTablet||isMobileOrTablet;


/*------MANAGE LISTENER HERE-----*/
//listen if button #go is cliked
document.getElementById("location").addEventListener("click", () =>{
    let querySearch = document.getElementById("query").value;
    if(querySearch == ""){
        alert("You must select your destination location !!!");
    }else{
        //call trip function and suggest
        setTrip(querySearch);
    }
});


/*-----All functions are defined here----*/
//function for set route
function setRoute(){
    tt.services.calculateRoute({
        key: keys.key,
        locations: '4.8,52.3:4.87,52.37'
    }).go().then(function(routeData) {
        console.log(routeData.toGeoJson());
    });
}

//function for trip road
function setTrip(querySearch){
    tt.services.fuzzySearch({
        key: keys.key,
        query: querySearch
    }).go().then(handleResults);
}

//find the current user location
lgtd = 0;
lttd = 0;
function findMyPosition(){
    //tt.setProductInfo("<your_product_name>", "your_product_version");
    var messages = {
        permissionDenied: "Permission denied. You can change your browser settings...",
        notAvailable: "Geolocation data provider not aavailable."
    }
    //For the geolocate plugin
    var geolocateControl = new tt.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: false
        }
    });
    bindEvents();
    //Handle case when domain permissions are already blocked
    handlePermissionDenied();
    map.addControl(geolocateControl);
    function handlePermissionDenied(){
        if("permissions" in navigator){
            navigator.permissions.query({name: "geolocation"}).then(function(result){
                if(result.state === 'denied'){
                    displayErrorMessage(messages.permissionDenied);
                }
            });
        }
    }
    function bindEvents(){
        geolocateControl.on('error', handleError);
    }
    function displayErrorMessage(message){
        document.getElementById("status").textContent = message;
    }
    function handleError(){
        //nothing to put here for the moment
    }
    const success = (position) => {
        const latitude = lttd = position.coords.latitude;
        const longitude = lgtd = position.coords.longitude;
        document.getElementById("status").textContent = longitude +", "+latitude;
        //AFTER ALL, SET THE MARKER FOR USER CURRENT POSITION
        var RoundLatLng = Formatters.roundLatLng;
        var center = [longitude, latitude];
        map = newMap(keys.key, "map", center, 1);
        var popup = new tt.Popup({
            offset: 35
        });
        var marker = new tt.Marker({
            draggable: false
        }).setLngLat(center).addTo(map);
        function onDragEnd(){
            var lngLat = marker.getLngLat();
            lngLat = new tt.LngLat(roundLatLng(lngLat.lng), roundLatLng(lngLat.lat));

            popup.setHTML(lngLat.toString());
            popup.setLngLat(lngLat);
            popup.setPopup(popup);
            marker.togglePopup();
        }
        marker.on("dragend", onDragEnd);
    }
    const error = () => {
        document.getElementById("status").textContent = messages.permissionDenied;
    }
    navigator.geolocation.getCurrentPosition(success, error);
}
function setControlsMap(){
    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl());
}