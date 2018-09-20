import { PubSub } from 'apollo-server-express';

export const topics = {
   REVIEW_ADDED : "reviewAdded",
};

export const mediator = new PubSub();

export default mediator;