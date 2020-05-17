const chai = require('chai');
const expect = chai.expect;

const mockServer = require('graphql-tools').mockServer;
const MockList = require('graphql-tools').MockList;
const casual = require('graphql-tools').casual;
const schema = require('../schemas/schema.js');

describe('movies', () => {
  it('returns a list of movies with the right fields', async () => {

    const testMockServer = mockServer(schema, {
      ID: () => "id",
      String: () => "string",
      Movie: () => ({
        genres: () => new MockList([1,5]),
      }),
    });

    const response = await testMockServer.query(`{
      movies(originalTitle: "", sortBy: "originalTitle", orderBy: "asc", yearFrom: "1900", yearTo: "2050", genres: "") {
        id
        originalTitle
        poster
        year
        genres
      }
    }`);

    expect(response.data.movies).to.have.lengthOf.above(1);

    response.data.movies.forEach((movie) => {
      expect(movie.id).to.equal("id");
      expect(movie.originalTitle).to.equal("string");
      expect(movie.poster).to.equal("string");
      expect(movie.year).to.equal("string");
      expect(movie.genres).to.have.lengthOf.at.least(1);

      movie.genres.forEach((genre) => {
        expect(genre).to.equal("string");
      });
    });
  })
});

describe('movie', () => {
  it('returns movie with storyline', async () => {

    const testMockServer = mockServer(schema, {
      String: () => 'string',
    });

    const response = await testMockServer.query(`{
      movie(id: 0) {
        storyline
      }
    }`);

    expect(response.data.movie.storyline).to.equal("string");
  })
});

describe('reviews', () => {
  it('returns a list of reviews with the right fields', async () => {

    const testMockServer = mockServer(schema, {
      String: () => 'string',
      ID: () => "id",
      Int: () => 1,
      DateTime: () => "1997-11-11T00:00:00Z",
    });

    const response = await testMockServer.query(`{
      reviews(movieId: 0, offset: 0) {
        id
        movieId
      	rating
        text
        timestamp
      }
    }`);

    expect(response.data.reviews).to.have.lengthOf.above(1);

    response.data.reviews.forEach((review) => {
      expect(review.id).to.equal("id");
      expect(review.movieId).to.equal("id");
      expect(review.rating).to.equal(1);
      expect(review.text).to.equal("string");
      expect(review.timestamp).to.equal("1997-11-11T00:00:00Z");
    });
  });
});

describe("yearCount", () => {
  it("returns a list of year and count pairs", async () => {

    const testMockServer = mockServer(schema, {
      Int: () => 1
    });

    const response = await testMockServer.query(`{
      yearCount {
        year
        count
      }
    }`);

    expect(response.data.yearCount).to.have.lengthOf.above(1);

    response.data.yearCount.forEach((pair) => {
      expect(pair.year).to.equal(1);
      expect(pair.count).to.equal(1);
    });

  });
});

describe("genreCount", () => {
  it("returns a list of genre and count pairs", async () => {

    const testMockServer = mockServer(schema, {
      String: () => "string",
      Int: () => 1
    });

    const response = await testMockServer.query(`{
      genreCount {
        genre
        count
      }
    }`);

    expect(response.data.genreCount).to.have.lengthOf.above(1);

    response.data.genreCount.forEach((pair) => {
      expect(pair.genre).to.equal("string");
      expect(pair.count).to.equal(1);
    });

  });
});

describe("addReview", () => {
  it("returns a review with the correct fields", async () => {

    const testMockServer = mockServer(schema, {
      ID: () => "id",
      Int: () => 1,
      String: () => "string",
      DateTime: () => "1997-11-11T00:00:00Z"
    });

    const response = await testMockServer.query(`mutation {
      addReview(movieId: "movieId", rating: 5, text: "text") {
        id
        movieId
        rating
        text
        timestamp
      }
    }`);

    expect(response.data.addReview.id).to.equal("id");
    expect(response.data.addReview.movieId).to.equal("id");
    expect(response.data.addReview.rating).to.equal(1);
    expect(response.data.addReview.text).to.equal("string");
    expect(response.data.addReview.timestamp).to.equal("1997-11-11T00:00:00Z");

  });
});