import {mercureConfig} from "@/configuration/mercure";

export const notification = (mercureUrl, uuid) => {
  const hubUrl = new URL(mercureUrl);
  hubUrl.searchParams.append('topic', (null === uuid ) ? `${mercureConfig.globalTopic}` : `${mercureConfig.globalTopic}/${uuid}`);
  return new EventSource(hubUrl.toString(), { withCredentials: true });
}
