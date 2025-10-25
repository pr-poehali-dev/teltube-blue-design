"""
Business: Получение списка видео, загрузка новых видео, обновление просмотров
Args: event - dict with httpMethod, body, queryStringParameters
      context - object with attributes: request_id, function_name
Returns: HTTP response dict со списком видео или результатом операции
"""

import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

DATABASE_URL = os.environ.get('DATABASE_URL', '')

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        user_id = params.get('user_id')
        
        if user_id:
            cursor.execute("""
                SELECT v.*, u.name as channel_name, u.avatar_url as channel_avatar
                FROM videos v
                JOIN users u ON v.user_id = u.id
                WHERE v.user_id = %s
                ORDER BY v.created_at DESC
            """, (user_id,))
        else:
            cursor.execute("""
                SELECT v.*, u.name as channel_name, u.avatar_url as channel_avatar
                FROM videos v
                JOIN users u ON v.user_id = u.id
                ORDER BY v.created_at DESC
                LIMIT 50
            """)
        
        videos = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'videos': [dict(v) for v in videos]}, default=str),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        action = body_data.get('action', 'create')
        
        if action == 'create':
            user_id = body_data.get('user_id')
            title = body_data.get('title', '')
            description = body_data.get('description', '')
            video_url = body_data.get('video_url', '')
            thumbnail_url = body_data.get('thumbnail_url', '')
            duration = body_data.get('duration', 0)
            
            if not user_id or not title or not video_url:
                cursor.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'user_id, title и video_url обязательны'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(
                """INSERT INTO videos (user_id, title, description, video_url, thumbnail_url, duration)
                   VALUES (%s, %s, %s, %s, %s, %s)
                   RETURNING id, title, video_url, thumbnail_url, created_at""",
                (user_id, title, description, video_url, thumbnail_url, duration)
            )
            video = cursor.fetchone()
            conn.commit()
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'video': dict(video)}, default=str),
                'isBase64Encoded': False
            }
        
        elif action == 'view':
            video_id = body_data.get('video_id')
            
            if not video_id:
                cursor.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'video_id обязателен'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute("UPDATE videos SET views = views + 1 WHERE id = %s RETURNING views", (video_id,))
            result = cursor.fetchone()
            conn.commit()
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'views': result['views'] if result else 0}),
                'isBase64Encoded': False
            }
    
    cursor.close()
    conn.close()
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
