import React from 'react';
import { API, Auth } from 'aws-amplify';

class MyComponent extends React.Component {
    state = {
        textBoxes: [''], // to keep track of the text boxes
        textBoxValues: {} // to keep track of the text box values
    }

    handleInputChange = (e, index) => {
        const { textBoxValues } = this.state;
        textBoxValues[index] = e.target.value;
    
        this.setState({
            textBoxValues: { ...textBoxValues }
        });
    }

    handleSubmit = async () => {
        const { textBoxValues } = this.state;

        try {
            // Get the authenticated user's identity
            const user = await Auth.currentAuthenticatedUser();
            const userId = user.attributes.sub; // Assuming 'sub' is the user ID attribute
            
            // Get the JWT token from the user's session
            const session = user.signInUserSession;
          //  const accessToken = session.accessToken.jwtToken;
            let jwtToken = user.signInUserSession.idToken.jwtToken;

            // Send the text and user ID to your Lambda function
            const response = await API.post('TextToSpeechAPI', '/text', {
                headers: {
                    Authorization: jwtToken, // Include the token in the "Authorization" header
                },
                body: {
                    text: textBoxValues,
                    userId: userId, // Include the user ID in the request body
                },
            });

            console.log('Data submitted:', response);
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    render() {
        const { textBoxes } = this.state;

        return (
            <div>
                <h3>Enter the text you would like to convert:</h3>

                {textBoxes.map((textBox, index) => (
                    <input 
                        key={index} 
                        type='text' 
                        onChange={e => this.handleInputChange(e, index)} 
                    />
                ))}

                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}

export default MyComponent;