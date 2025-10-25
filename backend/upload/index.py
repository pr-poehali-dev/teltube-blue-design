"""
Business: Загрузка видео файлов в Cloudflare Stream и сохранение в БД
Args: event - dict with httpMethod, body (base64 encoded video), headers
      context - object with attributes: request_id, function_name
Returns: HTTP response dict с URL загруженного видео
"""

import json
import os
import base64
from typing import Dict, Any
import requests

CLOUDFLARE_ACCOUNT_ID = os.environ.get('CLOUDFLARE_ACCOUNT_ID', '')
CLOUDFLARE_API_TOKEN = os.environ.get('CLOUDFLARE_API_TOKEN', '')

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    file_data_base64 = body_data.get('file', '')
    filename = body_data.get('filename', 'video.mp4')
    
    if not file_data_base64:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'File data is required'}),
            'isBase64Encoded': False
        }
    
    try:
        file_data = base64.b64decode(file_data_base64)
    except Exception:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid base64 file data'}),
            'isBase64Encoded': False
        }
    
    url = f'https://api.cloudflare.com/client/v4/accounts/{CLOUDFLARE_ACCOUNT_ID}/stream'
    
    headers = {
        'Authorization': f'Bearer {CLOUDFLARE_API_TOKEN}',
    }
    
    files = {
        'file': (filename, file_data, 'video/mp4')
    }
    
    response = requests.post(url, headers=headers, files=files)
    
    if response.status_code != 200:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'error': 'Failed to upload video to Cloudflare',
                'details': response.text
            }),
            'isBase64Encoded': False
        }
    
    result = response.json()
    
    if not result.get('success'):
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'error': 'Cloudflare upload failed',
                'details': result
            }),
            'isBase64Encoded': False
        }
    
    video_data = result.get('result', {})
    playback_url = video_data.get('playback', {}).get('hls', '')
    thumbnail_url = video_data.get('thumbnail', '')
    duration = video_data.get('duration', 0)
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'video_url': playback_url,
            'thumbnail_url': thumbnail_url,
            'duration': duration
        }),
        'isBase64Encoded': False
    }
