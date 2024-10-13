import { useContext } from "react";
import {Alert,Button,Form,Row,Col,Stack} from "react-bootstrap"
import AuthContext from "../context/authContext";

const Register = () => {
    const {registerInfo,updateregisterInfo,registerError,registerUser,isregisterLoading} = useContext(AuthContext)
    return (
        <>
        <Form onSubmit={registerUser}>
        <Row style={{height:"100vh", justifyContent:"center",padding:"10%"}}>
                <Col xs={6}>
                <Stack gap="3"> 
                    <h2>Register</h2>  

                    <Form.Control type="text" placeholder="Enter Your Name" onChange={(e)=>updateregisterInfo({...registerInfo,name:e.target.value})}/>
                    <Form.Control type="email" placeholder="Enter Your Email" onChange={(e)=>updateregisterInfo({...registerInfo,email:e.target.value})}/>
                    <Form.Control type="password" placeholder="Enter Your Password" onChange={(e)=>updateregisterInfo({...registerInfo,password:e.target.value})}/>
                    <Button type="submit">{isregisterLoading?"Creating your account":"Register"}</Button>
                    {registerError?.error && <Alert variant="danger">{registerError?.message}</Alert> }
                    
                </Stack>
                </Col>
            </Row>
        </Form>
        </>
      );
}
 
export default Register;