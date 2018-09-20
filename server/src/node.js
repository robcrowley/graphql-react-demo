import {
  fromGlobalId
} from "graphql-relay";

export const extractId = (args, idSelector) => {
    if (idSelector(args)) {
        return idSelector(args);
    }

    if (args.id) {
        const { id } = fromGlobalId(args.id);
        if (!id || id === '') {
            throw new Error(`No valid identifier extracted from ${args.id}`);
        }
        return id;
    }
    throw new Error(`An id or ${idName} argument is required`);
}