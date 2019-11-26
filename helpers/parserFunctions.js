export const formState = (e, state) => {
    const { form } = state;
    const currentState = form;
    const id = e.target.id
    const val = e.target.value
    currentState[id] = val
    return currentState
}

export const formErrs = (err, state) => {
    const { errors } = state;
    const currentState = errors;
    const path = err.params.path
    const message = err.message
    currentState[path] = message
    return currentState
}

export const timePassed = (start) => {
    let startStamp = new Date(start).getTime()
    let now = new Date().getTime()
    let d = now-startStamp
    if (d > 86400000) {
        // handle days
        let days = Math.round(d / 86400000)
        return days+" days"
    } else if (d > 3600000) {
        // handle hours
        let hours = Math.round(d / 3600000)
        return hours+" hours"
    } else if (d > 60000) {
        // handle minutes
        let mins = Math.round(d / 60000)
        return mins+" minutes"
    } else {
        // handle seconds
        let secs = Math.round(d / 1000)
        return secs+" seconds"
    }
}

export const parseDate = (d) => {
  let date = new Date(d);
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  return day+"/"+month+"/"+year
}

export const checkDate = (date) => {
    if(date  == "Invalid Date"){
      return ""
    } else {
      return date.toISOString()
    }
}