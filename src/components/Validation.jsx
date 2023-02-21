const Validation = (a)=>{
    
    if(a.user ==='joaopds' && a.password ==='12345678'){
        return {message:'Credencial válida!',icon:'fas fa-thumbs-up',variant:'bg-success'}
    }else{
        return {message:'Credencial inválida!', icon:'fas fa-exclamation-triangle', variant:'bg-danger'}
    } 
}

export default Validation