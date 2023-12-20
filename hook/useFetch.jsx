import { View, Text } from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: {...query},
    headers: {
      'X-RapidAPI-Key': 'b03b56331fmshbb2778df9e03506p118521jsn7e6fc42a9b58',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
  };


  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.request(options);
      // console.log(response.data);
      setData(response.data.data);
      setLoading(false);
      
      
    } catch (error) {
      setError(error);
      alert("Error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setLoading(true);
    fetchData();
  };

  // console.log(data);
  return { data, isLoading, error, refetch };

};

export default useFetch;
