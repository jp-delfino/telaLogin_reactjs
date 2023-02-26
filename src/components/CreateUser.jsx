import { React, useState } from "react";
import { Container, Form, Button, Row, Alert } from "react-bootstrap"

const CreateUser = () => {

    let objNewuser = {
        name: '',
        user: '',
        password: ''
    }
    const [newUser, setNewUser] = useState(objNewuser)

    const [alert, setAlert] = useState({
        variant: '',
        message: '',
        show: 'none'
    })

    const disableAlert = ()=>{
        setTimeout(()=>{
            setAlert({...alert,show:'none'})
            
        },5000)
    }

    const saveNewUser = () => {


        if (localStorage.getItem("listUsers") === null) {
            localStorage.setItem("listUsers", "[]")
        }

        let listUser = JSON.parse(localStorage.getItem("listUsers"))
        let existRegister = false;

        listUser.forEach((a) => {
            if (a.user === newUser.user) {
                existRegister = true
            }
        });

        //SE EXISTIR REGISTRO
        if (existRegister) {
            setAlert({
                variant: 'danger',
                message: 'Registro já existente!',
                show: 'block'
            })

            disableAlert()
        } else {
            listUser.push(newUser)
            localStorage.setItem("listUsers", JSON.stringify(listUser))
            setAlert({
                variant: 'success',
                message: 'Registro inserido com sucesso!',
                show: 'block'
            })

            disableAlert()
        }

    }

    return (
        <>
            <Container>
                <Row className=" mt-3 d-flex justify-content-center" >
                    <Alert className="col-8" variant={alert.variant} style={{display:alert.show}}>
                        {alert.message}
                    </Alert>
                </Row>
                <Row className="mt-2 d-flex justify-content-center" >
                    <div className="col-8" style={{ textAlign: "center", border: "1px solid #000", borderRadius: "8px", padding: "5px" }}>
                        ÁREA DE CADASTRO
                    </div>
                </Row>
                <Row className="d-flex justify-content-center">
                    <Form className="col-8 mt-5">
                        <Form.Group className="mb-2">
                            <Form.Label>Nome Completo:</Form.Label>
                            <Form.Control type="text" name="name" value={newUser.name} onChange={(a) => setNewUser({ ...newUser, name: a.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Usuário:</Form.Label>
                            <Form.Control type="text" name="user" value={newUser.user} onChange={(a) => setNewUser({ ...newUser, user: a.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Senha:</Form.Label>
                            <Form.Control type="password" name="password" value={newUser.password} onChange={(a) => setNewUser({ ...newUser, password: a.target.value })} />
                        </Form.Group>
                        <Button className="col-12" disabled={!(
                            newUser.nome !== '' &&
                            newUser.user !== '' &&
                            newUser.password !== '' &&
                            newUser.user.length > 3 &&
                            newUser.password.length > 7)} onClick={saveNewUser}>Salvar</Button>
                    </Form>
                </Row>
            </Container>
        </>
    )

}

export default CreateUser