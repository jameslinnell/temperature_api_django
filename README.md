# temperature_api_django
A REST API based on django. Temperature data is posted to django via a python script from a Raspberry PI. The django app does some data calculations with Numpy and SciPI before adding to the database. There is no django frontend, this is handled with React and chart.js

React frontend can be found here - https://agitated-babbage-765cbb.netlify.app/

REST API (DJANGO) can be found https://temperature-api-django.herokuapp.com/api/temperature_readings
  It can be ordered with ?ordering=value_datetime or ?ordering=-value_datetime for latest first
  Currently No Authentication on the REST API other than CORS whitelisting. So POSTing not available to any domain not whitelisted but anyone can GET the data.
  Data returned currently does not contain the numpy and scipy data as the api is running a different branch but the current data returned with numpy/scipy is like the following.
  
  
  [
    {
        "id": "dc19b1ec-871f-410f-9b88-fce8114e91db",
        "value": 19.25,
        "value_datetime": "2022-01-21T00:47:17.258591Z",
        "mean": 20.52587413394919,
        "median": 20.312,
        "mode": 20.375,
        "std_deviation": 2.81041040358569,
        "variance": 7.8984066365826795,
        "percentile25": 18.375,
        "percentile50": 20.312,
        "percentile75": 21.75
    }
 ]
