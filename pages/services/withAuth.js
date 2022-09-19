import Signup from '../signup.page';
import { getUser } from "./authService";
const withAuth = Component => {
    const Auth = (props) => {
        const isLoggedIn = false;
        if (getUser()) {
            if (getUser().email) {
                isLoggedIn = true;
            }
        }
    
        if (!isLoggedIn) {
            if (typeof window !== 'undefined') {
                window.open("/signup", "_self");
            }
        } else {
            return (
                <Component {...props} />
            );
        }
        return (<div className="main-loader"><div className="main-site-loader"></div></div>);
    };
  
    if (Component.getInitialProps) {
      Auth.getInitialProps = Component.getInitialProps;
    }
  
    return Auth;
  };
  
  export default withAuth;