import '@aws-amplify/ui-react/styles.css';
import { Authenticator } from '@aws-amplify/ui-react'

const PremiumPage = () => {
    return(
        <Authenticator>
            {({ signOut }) => (
                <div>
                    <h1>Hello, welcome to my Website</h1>
                    <h3>You are authenticated! This is the premium content page!</h3>
                    <button onClick={signOut}>Sign Out</button>
                </div>
            )}
        </Authenticator>

    );
}

export default PremiumPage;