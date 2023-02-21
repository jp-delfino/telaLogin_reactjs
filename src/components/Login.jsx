import {React, useState, useEffect} from "react";
import {Modal, ModalBody, Container,Form,Button} from 'react-bootstrap'
import Logo from '../img/logo.svg'
import Validation from "./Validation";

const TelaLogin = () =>{

    const [conf,setConf] = useState({saveData:false,user:'',password:''})
    const [modal,setModal] = useState({status:false,message:'',variant:'',icon:''})
    const [credencial,setCredencial] = useState({user:'',password:''})
   
    const saveConfiguration = (a)=>{
        if(a.target.checked){
            let credencialSave = {saveData:true,user:credencial.user,password:btoa(credencial.password)}
            setConf(credencialSave) 
            localStorage.setItem('credencialSave',JSON.stringify(credencialSave))
        }else{
            localStorage.setItem('credencialSave','')
        }  
    }

    const validaDados = ()=>{
        let dadosValidacao = {user:credencial.user, password:credencial.password};
        let result = Validation(dadosValidacao)
        setModal(prevState=>{return{...prevState,message:result.message,status:true,variant:result.variant,icon:result.icon}}) 
    }

    useEffect(()=>{
        if(localStorage.getItem('credencialSave')){
            let dataSaved = JSON.parse(localStorage.getItem('credencialSave'))
                if(dataSaved.saveData){
                    setCredencial(prevState=>{return{...prevState,user:dataSaved.user}})
                    setCredencial(prevState=>{return{...prevState,password:atob(dataSaved.password)}})

                    document.querySelector('#user').value=dataSaved.user
                    document.querySelector('#password').value=atob(dataSaved.password)
                    document.querySelector('#lembrar').checked = dataSaved.saveData    
                }
        }
    },[])

    return (
        <>
             
            <Container className="d-flex justify-content-center mt-5" >    
                <Modal show={modal.status}  onHide={() => setModal(prevState=>{return{...prevState,status:false}})}>
                    <ModalBody className={modal.variant} style={{color:"#fff",borderColor:'transparent',textAlign:'center'}}>
                        <p className='mb-2' style={{fontSize:'50px'}}><i className={modal.icon}></i></p>
                        <p style={{fontSize:'18px'}}>{modal.message}</p>
                    </ModalBody>
                </Modal>
            <Form className="col-sm-8 col-md-4 ">
                    <Form.Group className="mb-3" style={{textAlign:"center"}}>
                        <img src={Logo} alt="logo" style={{width:"100px"}}/>
                        <h4 className="mt-2">You System</h4>
                    </Form.Group>    
                    <Form.Group className="mb-2">
                        <Form.Label>Usuário:</Form.Label>
                        <Form.Control type="text" name="user" id="user" onChange={(a)=>setCredencial(prevState=>{return {...prevState,user:a.target.value}})}/>
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Senha:</Form.Label>
                        <Form.Control type="password" name="password" id="password" onChange={(a)=>setCredencial(prevState=>{return {...prevState,password:a.target.value}})}/>
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Check type="checkbox" label="Lembre-me" id='lembrar' onChange={saveConfiguration} />
                    </Form.Group>
                    <Button variant="success" disabled={!(credencial.user!=='' && credencial.password !=='' && credencial.password.length>7)} className="col-12" onClick={validaDados}>Acessar</Button>
                </Form>
            </Container>
        </>
    )
}

export default TelaLogin
