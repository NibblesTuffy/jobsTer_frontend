export const addUserLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const removeUserLocalStorage = () => {
  localStorage.removeItem('user')
}

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user')
  console.log(`getUserFromLocalStorage ${user}`)
  if (user === undefined) {
    console.log(`.....................`)
    return JSON.parse(user)
  }
  return null
}

export const updateLocalStorage = (newUser) => {
    const user = localStorage.getItem('user')
    let userObj = JSON.parse(user)
    userObj = {...userObj, ...newUser}
    localStorage.setItem('user',JSON.stringify(userObj))
}
