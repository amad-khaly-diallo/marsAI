import { client } from './sanity';

export const getPosts = async () => {
  return await client.fetch(`*[_type == "post"]`);
};

export const getContactPage = async () => {
  const data = await client.fetch(`*[_type == "contactPage"][0]`);
  return data;
};

export const getCataloguePage = async () => {
  const data = await client.fetch(`*[_type == "cataloguePage"][0]`);
  return data;
};

export const getHomePhase1 = async () => {
  const data = await client.fetch(`*[_type == "homePhase1"][0]`);
  return data;
};

export const getHomePhase2 = async () => {
  const data = await client.fetch(`*[_type == "homePhase2"][0]`);
  return data;
};

export const getHomePhase3 = async () => {
  const data = await client.fetch(`*[_type == "homePhase3"][0]`);
  return data;
};

export const getParticiperPage = async () => {
  const data = await client.fetch(`*[_type == "participerPage"][0]`);
  return data;
};

export const getPartnerPage = async () => {
  const data = await client.fetch(`*[_type == "partnerPage"][0]`);
  return data;
};

export const getAboutPage = async () => {
  const data = await client.fetch(`*[_type == "aboutPage"][0]`);
  return data;
};

export const getJuryPage = async () => {
  const data = await client.fetch(`*[_type == "juryPage"][0]`);
  return data;
};
