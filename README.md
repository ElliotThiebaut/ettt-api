<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/ElliotThiebaut/ettt-api">
    <img src="https://i.imgur.com/znMLazJ_d.webp?maxwidth=760&fidelity=grand" alt="Logo" width="100" height="100">
  </a>

<h3 align="center">ETTT Cloud API</h3>

  <p align="center">
    The api.ettt.cloud is a database API that stores vital information for risitas.fun webapps like Risichat.
    <br />
    <a href="https://ettt-cloud.readme.io"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/ElliotThiebaut/ettt-api/issues">Report Bug</a>
    ·
    <a href="https://github.com/ElliotThiebaut/ettt-api/issues">Request Feature</a>
  </p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project


This project and therefore API is made for risitas.fun webapps. Therefore, it can only be used by authorized apps to maintain a clean database and to secure any information stored. However, it is available on github to give anyone the possibility to clone the code and built their own API using this repo as a starting base for any mongoDB interaction API.


### Built With

* [NodeJS 14](https://nodejs.org/en/)
* [Express](https://expressjs.com/)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This project uses NodeJS as it's runtime, therefore it is required to have at least version 14.17.4 installed.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ElliotThiebaut/ettt-api
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

3. Create a .env file with this structure
   ```dotenv
   DB_USER=[mongoDB username]
   DB_PASSWORD=[mongoDB password]
   DB_HOST=[mongoDB access url]
   COLLECTION_NAME=[mongoDB collection]
   TOKEN_KEY=[JWT key]
   ```



<!-- USAGE EXAMPLES -->
## Usage

This is a Restful API, so any endpoint and data structure follows the convention established by the REST architectural style. To see which endpoints are available and how to use them, a documentation is available.

[Documentation](https://ettt-cloud.readme.io)



<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/ElliotThiebaut/ettt-api/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are always welcome ! Dont hesite to contribute even if it's your first time engaging in this kind of open source project. The goal here is to help each other, threw a common project, and the regulars will be delighted to help you learn as you help solves issues at your own level. The only rule is to respect the established workflow as described below to maintain a clean codebase and a enjoyable experience for the code reviewers. 

### Workflow
1. Login to your github account
2. Let people know the issue you'll be working on (with a comment or a label on the issue)
3. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
4. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the Branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request to the dev branch



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Elliot Thiebaut - [email](mailto:hello@elliotthiebaut.com)

Project Link: [https://github.com/ElliotThiebaut/ettt-api](https://github.com/ElliotThiebaut/ettt-api)
