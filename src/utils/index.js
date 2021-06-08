
export function setStore(key,value,flag){
  if(flag&&value){
    localStorage.setItem(key,JSON.stringify(value))
  }else{
    localStorage.setItem(key,value)
  }
}

export function getStore(key,flag){
  const data = localStorage.getItem(key)
  return flag && data ? JSON.parse(data) : data
}

export function removeStore(key){
  localStorage.removeItem(key)
}


export function getToken(){
  return getStore('token')
}

export function setToken(token){
  setStore('token',token)
}

export function removeToken(){
  removeStore('token')
}