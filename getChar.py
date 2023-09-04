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

# Iterate through the rows of the table body
for row in tbody.find_all("tr"):
    columns = row.find_all("td")
    src = columns[0].find("img")["src"]
    name = columns[1].get_text(strip=True)
    match = re.search(r'(https?://.*?\.png)', src)
    if match:
        extracted_string = match.group(1)
        print(extracted_string)
        save = {"src": extracted_string, "name": name}
        print(save)
        data_list.append(save)
    else:
        print("'.png' not found in the URL")
        

# Write the extracted data to a JSON file
with open("tableJson.json", "w", encoding="utf-8") as json_file:
    json.dump(data_list, json_file, indent=4, ensure_ascii=False)

print("JSON data written to tableJson.json")
