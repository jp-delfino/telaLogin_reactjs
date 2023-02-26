import {React, useState, useEffect} from "react";
import {Modal, ModalBody, Container,Form,Button} from 'react-bootstrap'
import Logo from '../img/logo.svg'
import Validation from "./Validation";

const TelaLogin = () =>{

    const [modal,setModal] = useState({status:false,message:'',variant:'',icon:''})
    const [credential,setcredential] = useState({user:'',password:'',saveChecked:false})
   
    const saveConfiguration = (a)=>{
        setcredential({...credential,saveChecked:a.target.checked})

        if(a.target.checked){
            let credentialSave = {saveData:true,user:credential.user,password:credential.password}
            localStorage.setItem('credentialSave',JSON.stringify(credentialSave))
        }else{
            localStorage.setItem('credentialSave','')
        }  
    }

    const validaDados = ()=>{
        let dadosValidacao = {user:credential.user, password:credential.password};
        let result = Validation(dadosValidacao)
        setModal(prevState=>{return{...prevState,message:result.message,status:true,variant:result.variant,icon:result.icon}}) 
    }

    useEffect(()=>{
        if(localStorage.getItem('credentialSave')){
            let dataSaved = JSON.parse(localStorage.getItem('credentialSave'))
                if(dataSaved.saveData){
                   setcredential({user:dataSaved.user, password:dataSaved.password,saveChecked: dataSaved.saveData})
                }
        }
    },[])

    return (
        <>
             
            <Container className="d-flex justify-content-center mt-5" >    
                <Modal show={modal.status}  onHide={() => setModal({...modal,status:false})}>
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
                        <Form.Control type="text" name="user" id="user" value={credential.user} onChange={(a)=>setcredential({...credential,user:a.target.value})}/>
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Senha:</Form.Label>
                        <Form.Control type="password" name="password" id="password" value={credential.password} onChange={(a)=>setcredential({...credential,password:a.target.value})}/>
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Check type="checkbox" label="Lembre-me" id='lembrar' checked={credential.saveChecked} onChange={saveConfiguration} />
                    </Form.Group>
                    <Button variant="success" disabled={!(credential.user!=='' && credential.password !=='' && credential.password.length>7)} className="col-12" onClick={validaDados}>Acessar</Button>
                </Form>
            </Container>
        </>
    )
}

export default TelaLogin
