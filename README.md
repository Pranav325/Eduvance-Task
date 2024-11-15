Diabetes File Processing Application

Project Overview

This small web application allows users to upload a CSV file and receive an analysis of the dataset. The app uses a ReactJS frontend to handle the file upload and displays the analysis results. An AWS Lambda function serves as the backend for processing and analyzing the uploaded CSV file, with the files being temporarily stored in an Amazon S3 bucket.

Prerequisites

Node.js
AWS Account with permissions to access Lambda and S3
An S3 bucket created for storing uploaded files
HTTP API setup for the AWS Lambda function

Setup and Installation

Frontend:
Navigate to the frontend folder.
Install dependencies: npm install
Update FileUpload.js (Line:40) with the AWS Lambda API endpoint.
Start the frontend: npm start

Backend (AWS Lambda Function):
Create a Lambda function in AWS with an appropriate runtime using the lamda_function.py code.
Attach necessary permissions for the Lambda function to access the S3 bucket.
Upload the Lambda function code provided in this repository.
Set up the API Gateway with CORS enabled to allow the frontend to communicate with the backend.

Usage
Open the application.
Select a .csv file from your local machine.
Click "Upload and Process" to upload the file. A processing message will appear.
View the results of the analysis in the "Analysis Results" section.

Troubleshooting
Ensure CORS is enabled for API Gateway to allow the frontend to access the Lambda function.
Verify AWS Lambda permissions for S3 read and write access if file upload fails.
Confirm the Lambda API endpoint is correctly set in FileUpload.js.