from PIL import Image, ImageDraw, ImageFont
import os
from datetime import datetime
import requests

def loadfont(fontsize):
    ttf = './assets/fonts/Pretendard-Bold.ttf'
    return ImageFont.truetype(font=ttf, size=fontsize)

weekdays = ['월', '화', '수', '목', '금']

def rest(lst, date):
    W = 1024
    H = 1024

    date_font = loadfont(36)
    date_font_color = 'rgb(234, 92,81)'

    image = Image.open('./assets/images/rest_background.png')
    draw = ImageDraw.Draw(image)

    parsed_day = date.split('-')
    text = f'{parsed_day[0]}년 {parsed_day[1]}월'
    draw.text((W - 290, 75), text, font=date_font, fill=date_font_color, align='right')
 
    rest_font = loadfont(56)
    rest_font_color = 'rgb(234, 92,81)'

    text_l = 70

    lst = reversed(lst)

    for l in lst:
        weekday = weekdays[datetime.strptime(l['date'], '%Y-%m-%d').weekday()]
        dayNumber = int(l['date'].split('-')[2])
        content = l['content']

        draw.text((75, H - 75 - text_l), f'{dayNumber}일 ({weekday}) - {content}', font=rest_font, fill=rest_font_color)
        text_l += 85 

    image.convert('RGB').save('./build/rest.jpeg', format='JPEG', quality=95)


def transform_meal_data(response_data):
    transformed_data = []
    for item in response_data['data']:
        date = item['date']
        meal_info = item['meals'][0]['meal'] if item['meals'] else None
        transformed_data.append({
            'date': date,
            'content': meal_info
        })
    return transformed_data

def get_rest_json():
    today = datetime.today()
    date = today.strftime('%Y-%m-%d')
    response = requests.get('http://127.0.0.1:8030/meal/rest')
    transformed_data = transform_meal_data(response.json())

    rest(transformed_data, date)

def main():
    if not os.path.exists('./build/'):
        os.makedirs('./build/')

    get_rest_json()

main()
