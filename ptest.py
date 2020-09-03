import requests
from bs4 import BeautifulSoup
import json

# This function takes in a table from bs4 and extracts all table data into a dictionary with headings from he table header. Then saves to json file
def getTableData(table):
    header = [th.text.strip() for th in table.find_all('th')]
    tableDicts = []

    tbody = table.find('tbody')
    trs = tbody.find_all('tr')
    for tr in trs:
        tds = tr.find_all('td') 
        if len(tds)>0:  
            tableDict = dict([(x,'') for x in header])
            keys = list(tableDict.keys())
            for (i,td) in enumerate(tds):           
                tdsa = td.find_all('a')
                if len(tdsa)>0:
                    tableDict[keys[i]] = tdsa[0].text.strip()
                else:
                    tableDict[keys[i]] = td.text.strip()
            tableDicts.append(tableDict)
    print('got table data')
    print('entries found: '+str(len(tableDicts)))

    return tableDicts

def getGeoJSONCoords(dictData):
    for district in dictData:
        code = district['Code']
        url = "http://mapit.code4sa.org/area/MDB:"+code+".geojson"

        headers = {
            'cache-control': "no-cache",
            'postman-token': "d4936350-e076-260f-b507-3ffcad4b4826"
            }

        response = requests.request("GET", url, headers=headers)
        district['GeoJSON'] = json.loads(response.text)
    print('got coords')
    return dictData

# This function writes a python dictionary to a JSON file
def dictToJSON(dict,filename):
    with open(filename+'.json', 'w') as fp:
        json.dump(dict, fp, indent=4)
    print('data write complete')


# *** WEB SCRAPE WIKI PAGE TO GET LIST OF MUNICIPALITY CODES ****
url = 'https://en.wikipedia.org/wiki/List_of_municipalities_in_South_Africa'
wiki = requests.get(url)
wikiSoup = BeautifulSoup(wiki.content, 'html.parser')
results = wikiSoup.find(id='mw-content-text')
tables = results.find_all('table', class_='wikitable')

# Getting all tables on page
metroMuniTable = tables[0]
districtMuniTable = tables[1]
localMuniTable = tables[2]
formerMuniTable = tables[3]

# Getting table data on page
metroData = getTableData(metroMuniTable)
districtData = getTableData(districtMuniTable)
localData = getTableData(localMuniTable)
formerData = getTableData(formerMuniTable)



# *** SEND GET REQUESTS TO MAPIT API TO GET GEOJSON DATA ***

metroData = getGeoJSONCoords(metroData)
districtData = getGeoJSONCoords(districtData)
localData = getGeoJSONCoords(localData)
formerData = getGeoJSONCoords(formerData)

# *** SAVE ALL GEOJSON DATA TO JSON FILE ***

dictToJSON(metroData,'metroData')
dictToJSON(districtData,'districtData')
dictToJSON(localData,'localData')
dictToJSON(formerData,'formerData')