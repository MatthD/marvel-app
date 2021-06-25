import { createHash } from 'crypto';
import { gql } from 'apollo-server-express';
import axios from 'axios';
import {
  MARVEL_API_URL,
  MARVEL_DEV_PUBLIC_KEY,
  MARVEL_DEV_PRIVATE_KEY,
} from './config';

export const typeDefs = gql`
  type characterInfos {
    id: ID!
    name: String!
    description: String!
    thumbnail: String
  }
  type Query {
    characters(limit: Int = 10, start: Int = 0): [characterInfos]
  }
`;

export async function characters(parent, { limit, start }) {
  const currentTs = Date.now().toString();
  const marvelRequestCaract = await axios.get(`${MARVEL_API_URL}characters`, {
    params: {
      ts: currentTs,
      apikey: MARVEL_DEV_PUBLIC_KEY,
      hash: createHash('md5')
        .update(currentTs + MARVEL_DEV_PRIVATE_KEY + MARVEL_DEV_PUBLIC_KEY)
        .digest('hex'),
      limit,
      offset: start,
    },
  });
  const sanitizedcharacters = getUsefullcharactersInfo(
    marvelRequestCaract?.data?.data?.results ?? []
  );
  return sanitizedcharacters;
}

function getUsefullcharactersInfo(listOfcharacters) {
  return listOfcharacters.map(({ id, name, description, thumbnail }) => ({
    id,
    name,
    description,
    thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
  }));
}
