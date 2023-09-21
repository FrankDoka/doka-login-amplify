import '@aws-amplify/ui-react/styles.css';
import { Authenticator } from '@aws-amplify/ui-react'

const PremiumPage = () => {
    return(
        <Authenticator>
            {({ signOut }) => (
                <div>
                    <h3>You are authenticated! This is the restricted content page!</h3>
                    <button onClick={signOut}>Sign Out</button>
                </div>
            )}
        </Authenticator>

    );
}

export default PremiumPage;