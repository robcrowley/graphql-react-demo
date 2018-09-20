import DataLoader from "dataloader";

const createLoaders = (viewer, models) => {
  const filmRoleByCharacterLoader = new DataLoader(ids =>
    models.filmRole.getByCharacter(viewer, ids)
  );
  const filmRoleByActorLoader = new DataLoader(ids =>
    models.filmRole.getByActor(viewer, ids)
  );
  const filmRoleByFilmLoader = new DataLoader(ids =>
    models.filmRole.getByFilm(viewer, ids)
  );
  const aggregateRatingLoader = new DataLoader(ids =>
    models.aggregateRating.get(viewer, ids)
  );
  const characterLoader = new DataLoader(ids =>
    models.character.get(viewer, ids)
  );
  const directorLoader = new DataLoader(ids =>
    models.director.get(viewer, ids)
  );
  const reviewLoader = new DataLoader(ids => models.review.get(viewer, ids));
  const genreLoader = new DataLoader(ids => models.genre.get(viewer, ids));
  const actorLoader = new DataLoader(ids => models.actor.get(viewer, ids));
  const filmLoader = new DataLoader(ids => models.film.get(viewer, ids));

  const userLoader = new DataLoader(ids =>
    Promise.all(
      ids.map(id =>
        models.user.get(viewer, id).then(user => {
          if (user) {
            userByUsernameLoader.prime(user.login, user);
          }
          return user;
        })
      )
    )
  );

  const userByUsernameLoader = new DataLoader(usernames =>
    Promise.all(
      usernames.map(login =>
        models.user.getByLogin(viewer, usernames).then(user => {
          if (user) {
            userLoader.prime(user.id, user);
          }
          return user;
        })
      )
    )
  );

  return {
    filmRoleByCharacter: filmRoleByCharacterLoader,
    filmRoleByActor: filmRoleByActorLoader,
    filmRoleByFilm: filmRoleByFilmLoader,
    userByUsername: userByUsernameLoader,
    aggregateRating: aggregateRatingLoader,
    character: characterLoader,
    director: directorLoader,
    review: reviewLoader,
    genre: genreLoader,
    actor: actorLoader,
    film: filmLoader,
    user: userLoader
  };
};

export default createLoaders;
