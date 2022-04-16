import React from 'react';

export function splitPrice(a){
    if (a){
    a = a.toString()
    let count = 0
    let result = []
  
    for (let i=a.length-1; i>=0; i--){
      if (count === 3){
        count = 0
        result.unshift(' ')
      }
      count += 1
      result.unshift(a[i])
    }
  
    return result.join('')
  }
  return 0
  }

export function formatDate(date){
    if (date){
      return date
    }
    return null
}

export function getValues(obj){
  const values = []
  const keys = Object.keys(obj)
  keys.map((key) => {
    values.push(obj[key])
  })

  return values
}

export function checkData(data){
  if(data !== null){
    return data.length
  }
  return null
}

export function filterParams(filter, page){
  if(page){
    filter.page = page
  }

  if (filter){
    const string = Object.entries(filter).map(([k,v])=>{
      if(v && v.length !== 0){
        return `${k}=${v}`
      } else {
        return null
      }
    }).filter(x => x)

    return (string.length !== 0 ? ("?" + string.join('&')) : "")
  } else {
    return ""
  }
}


