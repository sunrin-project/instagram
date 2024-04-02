from PIL import Image, ImageDraw, ImageFont
import json
import os
from datetime import datetime

def loadfont(fontsize):
    ttf = '../assets/fonts/NanumSquareRoundEB.ttf'
    return ImageFont.truetype(font=ttf, size=fontsize)

weekdays = ['월', '화', '수', '목', '금']

def school_meal(lst, date, weekday):
    W = 1024
    H = 1024

    lst = reversed(lst)

    date_font = loadfont(36)
    date_font_color = 'rgb(196, 196, 196)'

    image = Image.open('../assets/images/food_background.png')
    draw = ImageDraw.Draw(image)

    parsed_day = date.split('-')
    text = f'{parsed_day[0]}년 {parsed_day[1]}월 {parsed_day[2]}일 {weekdays[weekday]}요일'
    draw.text((W - 392 - 90, 75), text, font=date_font, fill=date_font_color, align='right')

    meal_font = loadfont(70)
    meal_font_color = 'rgb(71, 122, 255)'

    text_l = 70

    for l in lst:
        draw.text((75, H - 75 - text_l), l, font=meal_font, fill=meal_font_color)
        text_l += 85

    image.convert('RGB').save('./build/meal.jpeg', format='JPEG', quality=95)


def get_meal_json():
    with open('../json/meal.json', 'r', encoding='UTF8') as f:
        data = json.load(f)
        today = datetime.today()
        date = today.strftime('%Y-%m-%d')
        for d in data:
            if d['date'] == date:
                school_meal(d['meal'], date, today.weekday())

def main():
    if not os.path.exists('./build/'):
        os.makedirs('./build/')
    get_meal_json()

main()