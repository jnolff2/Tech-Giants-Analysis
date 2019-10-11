  // Submit Button handler
  function handleSubmit() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
  
	// Select the input value from the form
		var stock = d3.select("#stockInput").node().value;
    	console.log(stock);
  
    // Clear the input value
    d3.select("#stockInput").node().value = "";
  
    // Build the plot with the new stock that is searched
    buildPlot(stock);
	}

  function buildPlot(stock) {
	var apiKey = "5X4FVR1U687KCBK8";
	
    // URL for Alpha Vantage to pull our stock data
    var url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&outputsize=full&apikey=${apiKey}`;
  
    d3.json(url).then(function(data) {
  
      // Grab values from the response json object to build the plots
      var stock = data["Meta Data"]["2. Symbol"];
	  
	    // Create lists to hold the data from the json
      var dates = [];
      var closingPrices = [];
      var openingPrices = []; 
      var highPrices = [];
      var lowPrices = [];
      var timeSeriesData = data['Time Series (Daily)'];

	  // Loop through the json and push the appropriate data to the appropriate list
	  for(var key in timeSeriesData){
		  dates.push(key)
		  closingPrices.push(timeSeriesData[key]['4. close'])
		  openingPrices.push(timeSeriesData[key]['1. open'])
		  highPrices.push(timeSeriesData[key]['2. high'])
		  lowPrices.push(timeSeriesData[key]['3. low'])
	  }

      // Only grab the most recent 3 years of stock data
      var dates_drop = dates.slice(0, 759);
      var openingPrices_drop = openingPrices.slice(0, 759);
      var closingPrices_drop = closingPrices.slice(0, 759);
      var highPrices_drop = highPrices.slice(0, 759);
      var lowPrices_drop = lowPrices.slice(0, 759);

      // Candlestick Trace
      var trace2 = {
        type: "candlestick",
        x: dates_drop,
        high: highPrices_drop,
        low: lowPrices_drop,
        open: openingPrices_drop,
        close: closingPrices_drop
      };
  
      var data = [trace2];
      
      var layout = {
        title: `${stock.toUpperCase()} Stock Chart`,
        xaxis: {
		  //range: [dates[758], dates[0]],
		  title: "Date",
		  type: "date",
		  //   rangeslider: {
		  // 	visible: false
		  // }
        },
        yaxis: {
		  title: "Stock Price",
          autorange: true,
          type: "linear"
		  },
		  height: 800,
        width: 1200,
        margin: {
            l: 100,
            r: 100,
            b: 100,
            t: 100,
            pad: 4
          },
      };
	    Plotly.newPlot("plot", data, layout);
      });
    }
  
  // Add an event listener for the Plot Stock button
  d3.select("#submit").on("click", handleSubmit);

// Anime.js library for text effects
// Wrap every letter in a span
var textWrapper = document.querySelector('.title .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

// Create a moving letter effect where it looks like each letter of the title of our html page is being typed out and it continuously loops
anime.timeline({loop: true})
  .add({
    targets: '.title .letter',
    scale: [0.3,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 600,
    delay: (el, i) => 70 * (i+1)
  }).add({
    targets: '.title .line',
    scaleX: [0,1],
    opacity: [0.5,1],
    easing: "easeOutExpo",
    duration: 700,
    offset: '-=875',
    delay: (el, i, l) => 80 * (l - i)
  }).add({
    targets: '.title',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

  // Create a text effect of dropping the two words, "Plot Stock", on our button one at a time and have the effect loop
  anime.timeline({loop: true})
  .add({
    targets: '#submit .word',
    scale: [14,1],
    opacity: [0,1],
    easing: "easeOutCirc",
    duration: 800,
    delay: (el, i) => 800 * i
  }).add({
    targets: '#submit',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

