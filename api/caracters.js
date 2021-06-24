import { createHash } from 'crypto';
import { gql } from 'apollo-server-express';
import axios from 'axios';
import {
  MARVEL_API_URL,
  MARVEL_DEV_PUBLIC_KEY,
  MARVEL_DEV_PRIVATE_KEY,
} from './config';

export const typeDefs = gql`
  type CaracterInfos {
    id: ID!
    name: String!
    description: String!
    thumbnail: String
  }
  type Query {
    caracters: [CaracterInfos]
  }
`;

export async function caracters() {
  const currentTs = Date.now().toString();
  const marvelRequestCaract = await axios.get(`${MARVEL_API_URL}characters`, {
    params: {
      ts: currentTs,
      apikey: MARVEL_DEV_PUBLIC_KEY,
      hash: createHash('md5')
        .update(currentTs + MARVEL_DEV_PRIVATE_KEY + MARVEL_DEV_PUBLIC_KEY)
        .digest('hex'),
    },
  });
  const sanitizedCaracters = getUsefullCaractersInfo(
    marvelRequestCaract?.data?.data?.results ?? []
  );
  return sanitizedCaracters;
}

function getUsefullCaractersInfo(listOfCaracters) {
  return listOfCaracters.map(({ id, name, description, thumbnail }) => ({
    id,
    name,
    description,
    thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
  }));
}
