# The South Sudan Vaccination Certificate Public Printing Portal- API

This is the Api(backend) for the South Sudan Vaccination Certificate Public Printing Portal-frontend app.
The api is powered by Nodejs
find the ui repository [here](https://github.com/kosekaku/covac-certificate-ssd-react).

## Getting Started

### `npm install`

install all the api dependencies to start using the api.

### `npm start`

Runs the app in the development mode
with the babel cli.

### `npm run startWithnodemon`

Runs the app in the development mode
with the nodemon on the babel cli for continuous hot reloading

## DB side notes

> ### postgresql
>
> You may need to configure postgresql in the future once the monitor api endpoints are added

## Available endpoints

> `http://localhost:8000/api/v1/facilities`
>
> > fetches the DHIS2 organization units(OU) /facilities assigned to the vaccination program

> `http://localhost:8000/api/v1/teis`
>
> > fetches and filter DHIS2 tracked entity instances(TEIs) based on user provided data from the UI

> `http://localhost:8000/api/v1/teis/verify/${id}`
>
> > Verify the DHIS2 tracked entity instances(TEIs) based on user provided id

## api docs

> [postman links]('')

## pivotal tracker stories

> ...

## CI Builds

> [travis ci]('')
