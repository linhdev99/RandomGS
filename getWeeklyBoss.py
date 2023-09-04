from bs4 import BeautifulSoup
import json
import re

# Load the HTML file
with open("tableWeeklyBoss.html", "r", encoding="utf-8") as html_file:
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
    if (columns == []):
        continue
    src = columns[0].find("img")["data-src"]
    match = re.search(r'(https?://.*?\.png)', src)
    name = columns[0].find("img")["alt"]
    count_char += 1

    if match:
        extracted_string = match.group(1)
        save = {
            "src": extracted_string,
            "name": name,
        }
        data_list.append(save)
    else:
        print("'.png' not found in the URL")


# Write the extracted data to a JSON file
with open("tableWeeklyBossJson.json", "w", encoding="utf-8") as json_file:
    json.dump(data_list, json_file, indent=4, ensure_ascii=False)

print("JSON data written to tableJson.json")
