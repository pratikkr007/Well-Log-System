import boto3
from ..config import AWS_ACCESS_KEY, AWS_SECRET_KEY, S3_BUCKET

s3 = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY
)

def upload_file(file_obj, filename):
    s3.upload_fileobj(file_obj, S3_BUCKET, filename)
    return f"https://{S3_BUCKET}.s3.amazonaws.com/{filename}"
