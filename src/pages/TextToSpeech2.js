import React, { useState } from 'react';
import '@aws-amplify/ui-react/styles.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import MyComponent from '../components/Textbox';
import './TextToSpeech2.css'; // Import your CSS file
import $ from 'jquery'; // Import jQuery if not already imported
import { API, Auth } from 'aws-amplify';

const API_ENDPOINT_SEND = "https://bsc2utc2vj.execute-api.us-east-1.amazonaws.com/dev/text"
const API_ENDPOINT_RESPONSE = "https://bsc2utc2vj.execute-api.us-east-1.amazonaws.com/dev/response";

const TextToSpeech2 = () => {
  const [selectedVoice, setSelectedVoice] = useState('');
  const [inputText, setInputText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleVoiceChange = (event) => {
    setSelectedVoice(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSayButtonClick = async () => {

    const user = await Auth.currentAuthenticatedUser();
    const userId = user.attributes.sub; // Assuming 'sub' is the user ID attribute

    const session = user.signInUserSession;
    let jwtToken = user.signInUserSession.idToken.jwtToken;

    const inputData = {
        voice: selectedVoice,
        text: inputText,
        userId : user.attributes.sub
      };
      
    $.ajax({
        url: API_ENDPOINT_SEND,
        type: 'POST',
        data: JSON.stringify(inputData),
        contentType: 'application/json; charset=utf-8',
        headers: {
          Authorization: `${jwtToken}`, // Include the JWT token in the Authorization header
        },
        success: function (response) {
          document.getElementById("postIDreturned").textContent = "Post ID: " + response;
        },
        error: function () {
        }
      });
    };

  const handleSearchButtonClick = () => {
    const postId = document.getElementById('postId').value;

    $.ajax({
      url: API_ENDPOINT_RESPONSE + '?postId=' + postId,
      type: 'GET',
      success: function (response) {
        $('#posts tr').slice(1).remove();

        $.each(response, function (i, data) {
          var player = "<audio controls><source src='" + data['url'] + "' type='audio/mpeg'></audio>";

          if (typeof data['url'] === "undefined") {
            var player = ""
          }

          $("#posts").append("<tr> \
            <td>" + data['id'] + "</td> \
            <td>" + data['voice'] + "</td> \
            <td>" + data['text'] + "</td> \
            <td>" + data['status'] + "</td> \
            <td>" + player + "</td> \
            </tr>");
        });
      },
      error: function () {
        alert("error");
      }
    });
  };

  const handleTextareaChange = () => {
    const length = inputText.length;
    document.getElementById("charCounter").textContent = "Characters: " + length;
  };

  return (
    <div id="content">
      <label>
        Voice:
        <select id="voiceSelected" onChange={handleVoiceChange}>
        <option value="" selected disabled hidden>Choose here</option>
          <option value="Joanna">Joanna [English]</option>
          <option value="Marlene">Marlene [German]</option>
          <option value="Maxim">Maxim [Russian]</option>
          <option value="Mizuki">Mizukie [Japanese]</option>
          <option value="Carla">Carla [Italian]</option>
          {/* Add more options as needed */}
        </select>
      </label>

      <input type="submit" value="Convert to Speech" className="buttons" onClick={handleSayButtonClick} />
      <span id="postIDreturned"></span>

      <br /><br />

      <textarea id="postText" onChange={handleInputChange} onKeyUp={handleTextareaChange}></textarea>
      <span id="charCounter">Characters: {inputText.length}</span>

      <br /><br /><br /><br />

      <label>
        Copy the Post ID Provided Above:
        <input type="text" id="postId" />
      </label>

      <input type="submit" className="buttons" value="Search" onClick={handleSearchButtonClick} />
      <br />

      <table id="posts">
        <colgroup>
          <col style={{ width: '10%' }} />
          <col style={{ width: '7%' }} />
          <col style={{ width: '45%' }} />
          <col style={{ width: '8%' }} />
          <col style={{ width: '30%' }} />
        </colgroup>
        <tbody>
          <tr>
            <th>Post ID</th>
            <th>Voice</th>
            <th>Post</th>
            <th>Status</th>
            <th>Player</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default withAuthenticator(TextToSpeech2);