import { toast } from 'vuetify-sonner'
import {mercureConfig} from "@/configuration/mercure";

export const notification = (mercureUrl) => {
  const hubUrl = new URL(mercureUrl);
  hubUrl.searchParams.append('topic', `${mercureConfig.globalTopic}`);
  const eventSource = new EventSource(hubUrl.toString(), { withCredentials: true });
  eventSource.onmessage = (e) => {
    const result = JSON.parse(e.data);
    toast(result.message, {
      cardProps: {
        color: result.type
      },
      prependIcon: 'mdi-check-circle'
    });
  };

  eventSource.onerror = () =>  {
    console.log("An error occurred while attempting to connect to Mercure Hub.")
    eventSource.close();
  }
}
