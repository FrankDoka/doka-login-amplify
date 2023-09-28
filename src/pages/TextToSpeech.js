import '@aws-amplify/ui-react/styles.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import MyComponent from '../components/Textbox';

const TextToSpeech = () => {
    return (
        <MyComponent />     
    );
}

export default withAuthenticator(TextToSpeech);