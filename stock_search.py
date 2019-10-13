from flask import Flask, render_template, request
import requests
import json

def stock():
    aapl = requests.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY"
                 "&symbol=AAPL&outputsize=full&apikey=5X4FVR1U687KCBK8")

    amzn = requests.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY"
                 "&symbol=AMZN&outputsize=full&apikey=5X4FVR1U687KCBK8")

    fb = requests.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY"
                 "&symbol=FB&outputsize=full&apikey=5X4FVR1U687KCBK8")

    googl = requests.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY"
                 "&symbol=GOOGL&outputsize=full&apikey=5X4FVR1U687KCBK8")

    msft = requests.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY"
                 "&symbol=MSFT&outputsize=full&apikey=5X4FVR1U687KCBK8") 

    # Place all json stock data for the five companies into one dictionary
    data = {
        "AAPL": aapl.json(),
        "AMZN": amzn.json(),
        "FB": fb.json(),
        "GOOGL": googl.json(),
        "MSFT": msft.json()
    }
    return data

if __name__ == "__main__":

    # If running as script, print scraped data
    print(stock())