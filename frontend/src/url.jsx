const cheakfunc=()=>{
    if(localStorage.getItem('token')){
        return true
    }
    return false
}

export default cheakfunc