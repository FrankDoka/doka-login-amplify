import json
import boto3
import time  # Import the 'time' module

# Initialize the DynamoDB resource and table name
dynamodb = boto3.resource('dynamodb')
table_name = 'TextToSpeechTable'  # Replace with your DynamoDB table name

def lambda_handler(event, context):
    # Parse the input from the API Gateway request
    try:
        request_body = json.loads(event['body'])
        text = request_body['text']
        user_id = request_body['userId']
    except KeyError as e:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': f'Missing required field: {str(e)}'})
        }
    except json.JSONDecodeError as e:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Invalid JSON format in request body'})
        }
    
    # Store the text and user ID in DynamoDB
    try:
        dynamo_table = dynamodb.Table(table_name)
        dynamo_table.put_item(Item={
            'id': str(user_id) + '_' + str(int(time.time())),  # Unique ID for each entry
            'text': text,
            'userId': user_id
        })
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Text and user ID stored successfully'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Failed to store text and user ID', 'details': str(e)})
        }