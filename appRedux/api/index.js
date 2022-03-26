import { Service } from '../services';

const API_DOMAIN = process.env.API_DOMAIN;

export const queryDynamoDBApi = async ({}) => {
  try {
    let method = 'GET';
    let path = 'dynamodb';
    let response = await Service(API_DOMAIN, path, { method });
    return response;
  } catch (error) {
    throw error;
  }
}

export const queryRDSApi = async ({}) => {
  try {
    let method = 'GET';
    let path = 'rds';
    let response = await Service(API_DOMAIN, path, { method });
    return response;
  } catch (error) {
    throw error;
  }
}