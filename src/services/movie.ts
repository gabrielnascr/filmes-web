import { getAPIClient } from "./api";

class MovieService {
  async getAllMovies(ownerId: number) {
    const { data } = await getAPIClient().get(`movie/user/${ownerId}`);

    return data;
  }

  async store(storeData: any) {
    const { data } = await getAPIClient().post('/movie', storeData) 

    return data;
  }

  async delete(movieId: number){
    await getAPIClient().delete(`/movie/${movieId}`)
  }
}

export default new MovieService()