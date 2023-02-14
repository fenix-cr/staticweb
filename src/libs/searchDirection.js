// export default {
//     data() {
//         return {
//             autocomplete: ''
//         }
//     },
//     methods: {
//         initAutocomplete() {
//             this.autocomplete = new google.maps.places.Autocomplete(
//                 document.getElementById('autocomplete'),
//                 {
//                     types: ['establishment'],
//                     componentRestrictions: {'country': ['US']},
//                     fields: ['place_id', 'geometry', 'name']
//                 });
//             this.autocomplete.addEventListener('place_changed', this.onPlaceChanged);
//         },
//
//         onPlaceChanged() {
//
//             let place = this.autocomplete.getPlace();
//
//             if (!place.geometry) {
//                 document.getElementById('autocomplete').placeholder = 'Enter a place';
//             } else {
//                 document.getElementById('details').innerHTML = place.name;
//             }
//         }
//     }
//
// }



