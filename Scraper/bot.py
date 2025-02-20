import json

from flask import Flask, jsonify, Response
import requests
from bs4 import BeautifulSoup
import re

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
URL = "https://strav.nasejidelna.cz/0341/login"

def scrape_menu():
    response = requests.get(URL)
    if response.status_code != 200:
        return []
    
    soup = BeautifulSoup(response.text, "html.parser")
    meals = {"Ječná": []}  # jde upravit ale scrapuje to jenom pro jecnou cuz stepanska neni u nas

    # hleda podle datumu
    day_sections = soup.find_all("div", class_="jidelnicekDen")

    counter = 0

    for day_section in day_sections:
        # Tohle ziskava datum z nadpisu sekce
        date_match = re.search(r"(\d{2})\.(\d{2})\.(\d{4})", day_section.text)
        if not date_match:
            continue
        menu_date = f"{date_match.group(1)}-{date_match.group(2)}-{date_match.group(3)}"

        # for cyklus na nalezeni jednotlivych obedu
        meal_containers = day_section.find_all("div", class_="container")


        for container in meal_containers:
            location_element = container.find("div", class_="shrinkedColumn jidelnicekItem")
            if not location_element:
                continue

            location = location_element.text.strip()
            if location != "Ječná":
                continue  # tady to ignoruje vsechgno krome jecne



            meal_type_element = container.find("div", class_="smallBoldTitle jidelnicekItem")
            meal_type = meal_type_element.text.strip().lower().replace(" ", "") if meal_type_element else "unknown"

            # urceni cisla obeda, obed1,obed2 a datum
            match = re.search(r"Oběd\s*(\d+)", meal_type_element.text if meal_type_element else "")
            meal_number = match.group(1) if match else "1"


            description_elements = container.find_all("div", class_="column jidelnicekItem")
            description = ", ".join([span.text.strip() for span in description_elements])
            description = ' '.join(description.split())  # odstranovani mezer

            meals["Ječná"].append({"date": menu_date, "description": description, "meal_number": meal_number, })
            counter += 1
            if counter == 2:
                print("breaking")
                break
        if counter == 2:
            print("breaking")
            break
    meals["Ječná"][0]["meal_number"] = 1
    meals["Ječná"][1]["meal_number"] = 2
    return meals

@app.route("/meals", methods=["GET"])
def get_menu():
    menu = scrape_menu()
    response = Response(
        response=json.dumps(menu,ensure_ascii=False),
        status=200,
        content_type='application/json; charset=utf-8'
    )
    print(json.dumps(menu))
    return response

if __name__ == "__main__":
    app.run(debug=True)
