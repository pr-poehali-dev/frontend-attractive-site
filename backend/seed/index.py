import json
import os
import psycopg2
from typing import Dict, Any

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Заполнение базы данных начальными данными для портфолио
    '''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        cur.execute('''INSERT INTO projects (title, description, tags, gradient, demo_url, github_url) VALUES
            ('E-commerce платформа', 'Полнофункциональный интернет-магазин с корзиной, фильтрами и интеграцией платёжных систем', 'React,TypeScript,Redux,Stripe', 'from-yellow-600 to-yellow-400', '#', 'https://github.com'),
            ('Dashboard аналитики', 'Интерактивная панель с графиками, таблицами и реал-тайм обновлениями данных', 'React,Chart.js,WebSocket,Tailwind', 'from-amber-600 to-yellow-500', '#', 'https://github.com'),
            ('Социальная сеть', 'Платформа для общения с постами, комментариями, лайками и системой друзей', 'Next.js,PostgreSQL,Prisma,NextAuth', 'from-yellow-500 to-amber-400', '#', 'https://github.com'),
            ('Task менеджер', 'Приложение для управления задачами с drag-and-drop и командной работой', 'React,DnD Kit,Zustand,Firebase', 'from-yellow-600 to-orange-500', '#', 'https://github.com')
        ''')
        
        cur.execute('''INSERT INTO skills (name, level, icon, color) VALUES
            ('React & Next.js', 95, 'Code', 'text-primary'),
            ('TypeScript', 90, 'FileCode', 'text-secondary'),
            ('Tailwind CSS', 92, 'Palette', 'text-accent'),
            ('Redux & Zustand', 85, 'Database', 'text-primary'),
            ('REST API', 88, 'Globe', 'text-secondary'),
            ('Git & GitHub', 90, 'GitBranch', 'text-accent')
        ''')
        
        cur.execute('''INSERT INTO tools (name, icon) VALUES
            ('Vite', 'Zap'),
            ('Figma', 'Figma'),
            ('VS Code', 'Code2'),
            ('npm/yarn', 'Package'),
            ('Vercel', 'Rocket'),
            ('Postman', 'Send')
        ''')
        
        cur.execute('''INSERT INTO about_info (greeting, description1, description2) VALUES
            ('Привет! 👋', 
             'Я фронтенд-разработчик с опытом создания современных веб-приложений. Специализируюсь на React, TypeScript и современных фреймворках.',
             'Люблю превращать сложные задачи в простые и элегантные решения. Стремлюсь писать чистый, поддерживаемый код и создавать отличный пользовательский опыт.')
        ''')
        
        cur.execute('''INSERT INTO contact_info (email, location, response_time, github_url, linkedin_url, twitter_url) VALUES
            ('your.email@example.com', 'Москва, Россия', 'В течение 24 часов', 'https://github.com', 'https://linkedin.com', 'https://twitter.com')
        ''')
        
        cur.execute('''INSERT INTO admin_users (username, password_hash) VALUES
            ('admin', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYWPXy0fmLO')
        ''')
        
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'message': 'Database seeded successfully'}),
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
