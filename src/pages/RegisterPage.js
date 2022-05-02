import RegisterForm from "../containers/auth/RegisterForm";
import AuthTemplate from "../components/auth/AuthTemplate";
import HeaderContainer from "../containers/common/HeaderContainer";

const RegisterPage = () => {
    return (
        <>
        <HeaderContainer />
        <AuthTemplate>
            <RegisterForm />
        </AuthTemplate>
        </>
    )
};

export default RegisterPage;