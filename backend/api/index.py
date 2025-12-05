import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    API для управления контентом портфолио
    Поддерживает CRUD операции для проектов, навыков, инструментов, информации "Обо мне" и контактов
    '''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    path_params = event.get('pathParams', {})
    query_params = event.get('queryStringParameters', {})
    resource = query_params.get('resource', 'projects')
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        if method == 'GET':
            if resource == 'projects':
                cur.execute('SELECT * FROM projects ORDER BY created_at DESC')
                projects = cur.fetchall()
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps([dict(p) for p in projects], ensure_ascii=False),
                    'isBase64Encoded': False
                }
            
            elif resource == 'skills':
                cur.execute('SELECT * FROM skills ORDER BY level DESC')
                skills = cur.fetchall()
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps([dict(s) for s in skills], ensure_ascii=False),
                    'isBase64Encoded': False
                }
            
            elif resource == 'tools':
                cur.execute('SELECT * FROM tools ORDER BY name')
                tools = cur.fetchall()
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps([dict(t) for t in tools], ensure_ascii=False),
                    'isBase64Encoded': False
                }
            
            elif resource == 'about':
                cur.execute('SELECT * FROM about_info ORDER BY id DESC LIMIT 1')
                about = cur.fetchone()
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps(dict(about) if about else {}, ensure_ascii=False),
                    'isBase64Encoded': False
                }
            
            elif resource == 'contact':
                cur.execute('SELECT * FROM contact_info ORDER BY id DESC LIMIT 1')
                contact = cur.fetchone()
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps(dict(contact) if contact else {}, ensure_ascii=False),
                    'isBase64Encoded': False
                }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            if resource == 'projects':
                cur.execute(
                    '''INSERT INTO projects (title, description, tags, gradient, demo_url, github_url) 
                       VALUES (%s, %s, %s, %s, %s, %s) RETURNING *''',
                    (body['title'], body['description'], body['tags'], 
                     body['gradient'], body.get('demo_url', '#'), body.get('github_url', ''))
                )
                project = cur.fetchone()
                conn.commit()
                return {
                    'statusCode': 201,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps(dict(project), ensure_ascii=False),
                    'isBase64Encoded': False
                }
            
            elif resource == 'skills':
                cur.execute(
                    '''INSERT INTO skills (name, level, icon, color) 
                       VALUES (%s, %s, %s, %s) RETURNING *''',
                    (body['name'], body['level'], body['icon'], body['color'])
                )
                skill = cur.fetchone()
                conn.commit()
                return {
                    'statusCode': 201,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps(dict(skill), ensure_ascii=False),
                    'isBase64Encoded': False
                }
            
            elif resource == 'tools':
                cur.execute(
                    '''INSERT INTO tools (name, icon) 
                       VALUES (%s, %s) RETURNING *''',
                    (body['name'], body['icon'])
                )
                tool = cur.fetchone()
                conn.commit()
                return {
                    'statusCode': 201,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps(dict(tool), ensure_ascii=False),
                    'isBase64Encoded': False
                }
        
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            item_id = body.get('id')
            
            if resource == 'projects':
                cur.execute(
                    '''UPDATE projects SET title=%s, description=%s, tags=%s, gradient=%s, 
                       demo_url=%s, github_url=%s, updated_at=CURRENT_TIMESTAMP 
                       WHERE id=%s RETURNING *''',
                    (body['title'], body['description'], body['tags'], body['gradient'],
                     body.get('demo_url', '#'), body.get('github_url', ''), item_id)
                )
                project = cur.fetchone()
                conn.commit()
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps(dict(project) if project else {}, ensure_ascii=False),
                    'isBase64Encoded': False
                }
            
            elif resource == 'about':
                cur.execute(
                    '''UPDATE about_info SET greeting=%s, description1=%s, description2=%s, 
                       updated_at=CURRENT_TIMESTAMP WHERE id=1 RETURNING *''',
                    (body['greeting'], body['description1'], body['description2'])
                )
                about = cur.fetchone()
                conn.commit()
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps(dict(about) if about else {}, ensure_ascii=False),
                    'isBase64Encoded': False
                }
            
            elif resource == 'contact':
                cur.execute(
                    '''UPDATE contact_info SET email=%s, location=%s, response_time=%s,
                       github_url=%s, linkedin_url=%s, twitter_url=%s, updated_at=CURRENT_TIMESTAMP 
                       WHERE id=1 RETURNING *''',
                    (body['email'], body['location'], body['response_time'],
                     body.get('github_url'), body.get('linkedin_url'), body.get('twitter_url'))
                )
                contact = cur.fetchone()
                conn.commit()
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps(dict(contact) if contact else {}, ensure_ascii=False),
                    'isBase64Encoded': False
                }
        
        elif method == 'DELETE':
            item_id = query_params.get('id')
            
            if resource == 'projects':
                cur.execute('DELETE FROM projects WHERE id=%s', (item_id,))
                conn.commit()
            elif resource == 'skills':
                cur.execute('DELETE FROM skills WHERE id=%s', (item_id,))
                conn.commit()
            elif resource == 'tools':
                cur.execute('DELETE FROM tools WHERE id=%s', (item_id,))
                conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'message': 'Deleted successfully'}),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    
    finally:
        cur.close()
        conn.close()
