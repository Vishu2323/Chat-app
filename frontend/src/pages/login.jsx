import { useContext } from "react";
import {Alert,Button,Form,Row,Col,Stack} from "react-bootstrap"
import AuthContext from "../context/authContext";
const Login = () => {
    const {loginUser,loginError,loginInfo,updateLoginInfo,isloginLoading} = useContext((AuthContext))
    return (
        <>
        <Form  onSubmit={loginUser}>
        <Row style={{height:"100vh", justifyContent:"center",padding:"10%"}}>
                <Col xs={6}>
                <Stack gap="3"> 
                    <h2>Login</h2>  
                    <Form.Control type="email" placeholder="Enter Your Email" onChange={(e)=>updateLoginInfo({...loginInfo,email:e.target.value})}/>
                    <Form.Control type="password" placeholder="Enter Your Password" onChange={(e)=>updateLoginInfo({...loginInfo,password:e.target.value})}/>
                    <Button type="submit">{isloginLoading?"Getting you in":"Login"}</Button>
                    {loginError?.error && (<Alert variant="danger">{loginError?.message}</Alert>)}
                    
                </Stack>
                </Col>
            </Row>
        </Form>
        </>
      );
}
 
export default Login;