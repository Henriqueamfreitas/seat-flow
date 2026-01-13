import axios from "axios";

export class UserServiceClient {
  async findByEmail(email: string) {
    const response = await axios.get(
      `http://user-service:3000/internal/by-email/${email}`
    );

    return response.data;
  }
}
