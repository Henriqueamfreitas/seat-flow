import axios from "axios";

export class QueueServiceClient {
  async publish(event: string, payload: any) {
    await axios.post("http://queue-service:5000/events", {
      event,
      payload,
    });
  }
}