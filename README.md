## GUS URL Shortener

GUS is a URL shortener that allows users to create shortened URLs from long URLs. It also provides a simple analytics dashboard to view the number of clicks on the shortened URLs.

The frontend provides a form that does some basic validation on the URL to ensure that it starts with `http://` or `https://` and that it contains a domain. It also checks if the URL appears to already be shortened, and if so, it will not shorten it again.

Once a URL has been shortened, it replaces the original URL in the form, and switches to `copy` mode (as indicated by the button) to allow the user to quickly copy the shortened URL to the clipboard.

Once the user changes the text in the textbox, the form switches back to `shorten` mode (as indicated by the button).

The frontend also provides a list of the shortened URLs, and reports the number of times a short URL has been visited. The user can also download a CSV file with the visit data for the shortened URLs.


### Project Structure

This project is organized in a monorepo structure, with the following compnents:

- `api`: This project is an Elixir/Phoenix application that provides the API for the URL shortener. It uses a Postgres database to store the URLs and the click data. It also provides an OpenAPI 3.0 spec that can be viewed at [http://localhost:4005/api](http://localhost:4005/api) once the project is up and running. See also: [api/README.md](api/README.md) for more information.

- `web`: This project is a React application written in TypeScript and uses Tailwind CSS. It uses the API to create shortened URLs, create visits and view the analytics data. See also [web/README.md](web/README.md) for more information.


### Getting Started

In order to run the project, you will need to have the following installed on your machine:

- [Docker](https://www.docker.com/products/docker-desktop/)
- `make` (should be installed on most developer machines)
- (optional) [wrk](https://github.com/wg/wrk) to run the benchmarking script.
    - Mac: `brew install wrk`
    - Linux: check the package manager for your distribution


### Running the project

The project is managed by a `Makefile` and uses `docker compose` to set up the environment. You can see the list of available commands by running `make` without any arguments from the root of the monorepo.

To run the project:

1. Clone the repository
2. `cd` into the root of the monorepo and run `make setup` and `make up`
3. The frontend will be running on [http://localhost:3005](http://localhost:3005), and you can browse the Swagger API documentation at [http://localhost:4005/api](http://localhost:4005/api)


### Running tests

1. `cd` into the top-level directory (e.g. the one containing the `Makefile`) and run `make test`

- Note: you can also run the tests for the individual components by running `make test-api` or `make test-web`


### Benchmarking

The benchmark script is set up to create visits for a shortened URL, which writes a visit record, and increments the visit_count for the associated link record. To run the benchmark script:

1. Create a short URL
2. Copy the slug from the response (e.g. if the response is `http://localhost:3006/abc123`, then the slug is `abc123`)
3. Run the benchmark script with the slug: `make benchmark slug=<slug>` (e.g.`make benchmark slug=abc123`)
4. The script will run for 30 seconds by default, but you can optionally pass a `duration` argument to specify the number of seconds to run the script (e.g. `make benchmark slug=abc123 duration=10s`)


### Future Improvements

This is a minimally-viable product, and there are many improvements that could be made to make it more robust and feature-rich. Some of the improvements that could be made include:

- Add an authentication layer and scope the shortened URLs listing to the user that created them.
- Add a scan to ensure that the long URL is active and does not contain malware.
- Add a block list to prevent shortened URLs from other URL-shorteneing services from being shortened again.
- Allow users to set a custom "vanity" slug for the shortened URL.
- Generate a QR code for the shortened URL.
- Allow users to set an expiration date for the shortened URL.
- Add more analytics data, such as the location of the visitors, the referrer, etc, and allow for reporting over different time periods.
- Allow users to delete their shortened URLs.
- Add a rate limiter to prevent abuse of the API.
- Add a caching layer (e.g. ets or redis) to reduce the number of database queries.
- Batch the writes to the database for the visit data to reduce the number of writes and increase throughput.
