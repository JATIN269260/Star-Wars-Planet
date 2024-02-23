// services/swapiService.js
import axios from 'axios';

const swapiService = {
  fetchPlanets: async (page = 1) => {
    try {
      const response = await axios.get(`https://swapi.dev/api/planets/?format=json&page=${page}`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching planets:', error);
    }
  },
  fetchResidents: async (residentUrls) => {
    const residentRequests = residentUrls.map((residentUrl) => axios.get(residentUrl));
    try {
      const residentResponses = await Promise.all(residentRequests);
      return residentResponses.map((response) => response.data);
    } catch (error) {
      throw new Error('Error fetching residents:', error);
    }
  },
};

export default swapiService;
