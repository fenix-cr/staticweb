import router from '@/router'
// eslint-disable-next-line object-curly-newline
import {
    reactive,
    getCurrentInstance,
    watch,
    toRefs
} from '@vue/composition-api'
import moment from "moment"

export const isObject = obj => typeof obj === 'object' && obj !== null

export const isToday = date => {
    const today = new Date()
    return (
        /* eslint-disable operator-linebreak */
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
        /* eslint-enable */
    )
}

const getRandomFromArray = array => array[Math.floor(Math.random() * array.length)]

// ? Light and Dark variant is not included
// prettier-ignore
export const getRandomBsVariant = () => getRandomFromArray(['primary', 'secondary', 'success', 'warning', 'danger', 'info'])

export const isDynamicRouteActive = route => {
    const {
        route: resolvedRoute
    } = router.resolve(route)
    return resolvedRoute.path === router.currentRoute.path
}

// Thanks: https://medium.com/better-programming/reactive-vue-routes-with-the-composition-api-18c1abd878d1
export const useRouter = () => {
    const vm = getCurrentInstance().proxy
    const state = reactive({
        route: vm.$route,
    })

    watch(
        () => vm.$route,
        r => {
            state.route = r
        },
    )

    return {
        ...toRefs(state),
        router: vm.$router
    }
}


export const getMessageError = function (error) {
    let message = ""

    try {
        message = error.response.data.data !== undefined ? error.response.data.data : error.response.data.message
        if (message !== '' && message !== undefined) {
            console.error(message)
            return message
        }
    } catch (err) {}

    try {
        message = error.message
        console.error(message)
        return message
    } catch (err) {}

    try {
        message = error.data.exception
        console.error(message)
        return message
    } catch (err) {}

    return message
}

export const convertTZ = function (date, tzString) {
    let data = new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
        timeZone: tzString
    }));
    return data
}

export const getDiferenceTimeZones = function (tzStringCentral, tzStringPlace, placeTime,formatDate) {
	let res="";
	try {
    let currentPlaceTimeZone = convertTZ("2012/04/20 10:00:00", tzStringPlace);
    let centralTimeZone = convertTZ("2012/04/20 10:00:00", tzStringCentral);
	currentPlaceTimeZone=moment(currentPlaceTimeZone);
	centralTimeZone=moment(centralTimeZone);

    console.log("currentPlaceTimeZone")
    console.log(currentPlaceTimeZone)

    console.log("centralTimeZone")
    console.log(centralTimeZone)

    //let diff = currentPlaceTimeZone.diff(centralTimeZone,'hours');
    let diff = centralTimeZone.diff(currentPlaceTimeZone,'hours');
    console.log("diff")
    console.log(diff)
	placeTime=moment(placeTime);
    if(diff<0)	
    {
        let value=Math.abs(diff)
        placeTime=placeTime.subtract(value, 'hours');    
    }
    if(diff>0)
    {
        placeTime=placeTime.add((diff), 'hours');
    }

    res=placeTime.format(formatDate);
	} catch (error) {
	  console.error(error);
	}

	return res;
}

export const getCentralTime=function(item,formatTime)
{
  let res=""
  if(item.time_zone)
  {
    res=getDiferenceTimeZones('America/Chicago',item.time_zone,item.appoinment_datetime,formatTime)
  }
  return res
}



/**
 * This is just enhancement over Object.extend [Gives deep extend]
 * @param {target} a Object which contains values to be overridden
 * @param {source} b Object which contains values to override
 */
// export const objectExtend = (a, b) => {
//   // Don't touch 'null' or 'undefined' objects.
//   if (a == null || b == null) {
//     return a
//   }

//   Object.keys(b).forEach(key => {
//     if (Object.prototype.toString.call(b[key]) === '[object Object]') {
//       if (Object.prototype.toString.call(a[key]) !== '[object Object]') {
//         // eslint-disable-next-line no-param-reassign
//         a[key] = b[key]
//       } else {
//         // eslint-disable-next-line no-param-reassign
//         a[key] = objectExtend(a[key], b[key])
//       }
//     } else {
//       // eslint-disable-next-line no-param-reassign
//       a[key] = b[key]
//     }
//   })

//   return a
// }