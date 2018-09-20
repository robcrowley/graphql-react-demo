import env from 'dotenv';

/*eslint no-process-env: "0"*/
export const configure = () => {
    env.config({ silent: true });

    const port = process.env.PORT || 4000;
    const graphqlPath = process.env.GRAPHQL_PATH || '/graphql';
    const voyagerPath = process.env.VOYAGER_PATH || '/voyager';
    const queryComplexity = {
      maxDepth: parseInt(process.env.MAX_QUERY_DEPTH || 10),
      maxCost: parseInt(process.env.MAX_QUERY_COST || 50),
      defaultCost: parseInt(process.env.QUERY_COST_DEFAULT || 1)
    };
    const token = {
       secret: process.env.JWT_SIGNING_SECRET,
       expiry: process.env.JWT_EXPIRY || '1h'
    };
    const apolloEngineKey = process.env.APOLLO_ENGINE_KEY;
    const redisCache = {
      host: process.env.REDIS_CACHE_HOST || '127.0.0.1',
      port: process.env.REDIS_CACHE_PORT || 6379
    }

    return { port, graphqlPath, voyagerPath, queryComplexity, token, apolloEngineKey, redisCache };
}

export default configure();