import LoginForm from "../containers/auth/LoginForm";
import AuthTemplate from "../components/auth/AuthTemplate";
import HeaderContainer from "../containers/common/HeaderContainer";

const LoginPage = () => {
    return (
        <>
            <HeaderContainer />
            <AuthTemplate>
                <LoginForm />
            </AuthTemplate>
        </>
    )
};

export default LoginPage;