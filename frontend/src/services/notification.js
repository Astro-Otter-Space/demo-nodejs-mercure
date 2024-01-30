import {mercureConfig} from "@/configuration/mercure";

export const notification = (
  mercureUrl,
  topic
) => {
  const hubUrl = new URL(mercureUrl);
  hubUrl.searchParams.append('topic', `${mercureConfig.globalTopic}/${topic}`);
  return new EventSource(hubUrl.toString(), { withCredentials: true });
}
