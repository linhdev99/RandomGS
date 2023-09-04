from bs4 import BeautifulSoup
import json
import re

# Load the HTML file
with open("tableChar.html", "r", encoding="utf-8") as html_file:
    soup = BeautifulSoup(html_file, "html.parser")

# Find the table element where the data is stored
table = soup.find("table")

# Initialize a list to store the data
data_list = []

# Find the table body
tbody = table.find("tbody")
count_char = 0
# Iterate through the rows of the table body
for row in tbody.find_all("tr"):
    columns = row.find_all("td")
    src = columns[0].find("img")["src"]
    name = columns[1].get_text(strip=True)
    match = re.search(r'(https?://.*?\.png)', src)
    star = columns[2].find("img")["title"]
    starUrl = columns[2].find("img")["src"].split(".png")[0] + ".png"
    check_ngto = columns[3].find("a", {"title": True})
    ngto = None
    ngtoUrl = None
    if (str(check_ngto) != "None"):
        ngto = columns[3].find("a")["title"]
        ngtoUrl = columns[3].find("img")["src"].split(".svg")[0] + ".svg"
    else:
        print(check_ngto)
    weapon = columns[4].find("a")["title"]
    weaponUrl = columns[4].find("img")["src"].split(".png")[0] + ".png"
    count_char += 1

    if match:
        extracted_string = match.group(1)
        save = {
            "src": extracted_string,
            "name": name,
            "star": star,
            "element": ngto,
            "weapon": weapon,
            "starUrl": starUrl,
            "ngtoUrl": ngtoUrl,
            "weaponUrl": weaponUrl,
        }
        data_list.append(save)
    else:
        print("'.png' not found in the URL")


# Write the extracted data to a JSON file
with open("tableJson.json", "w", encoding="utf-8") as json_file:
    json.dump(data_list, json_file, indent=4, ensure_ascii=False)

print("JSON data written to tableJson.json")
