import '@aws-amplify/ui-react/styles.css';
import { Authenticator } from '@aws-amplify/ui-react'

const PremiumPage = () => {
    return(
        <Authenticator>
            {({ signOut }) => (
                <div>
                    <h1>You are authenticated! <br/><br/>
                    Hello, Please click the "Text to Speech" link at the top to access the application</h1>
                    <h2><br/>When you generate a post, copy the Post ID to the left of the "Convert to Speech" button and paste it into the bottom and hit "Search".</h2>
                    <h2><br></br>You can play the conversation directly from the website or download it.<br/><br/></h2>
                    <button onClick={signOut}>Sign Out</button>
                </div>
            )}
        </Authenticator>

    );
}

export default PremiumPage;