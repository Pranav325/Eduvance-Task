import json
import boto3
import pandas as pd
from io import StringIO


s3_client = boto3.client('s3')
BUCKET_NAME = 'Your-Unique-Bucket-Name'  
FILE_KEY = 'uploaded_files/dataset.csv' 

def lambda_handler(event, context):
    # importing the data
    file_content = event['body']
    s3_client.put_object(Bucket=BUCKET_NAME, Key=FILE_KEY, Body=file_content)
    csv_obj = s3_client.get_object(Bucket=BUCKET_NAME, Key=FILE_KEY)
    body = csv_obj['Body'].read().decode('utf-8')
    df = pd.read_csv(StringIO(body))
    
    # data analysis
    total_rows = len(df)
    shape = df.shape
    missing_values = df.isnull().sum().to_dict()
    averages = df.mean(numeric_only=True).to_dict()
    
    
    response_data = {
        "totalRows": total_rows,
        "shape": shape,
        "missingValues": missing_values,
        "averages": averages
    }
    
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'  
        },
        'body': json.dumps(response_data)
    }
