# LangImmersion

## Installation

1. Clone the repo
2. If you don't have Node installed yet, install it using, for example, this: [Node Version Manager](https://github.com/nvm-sh/nvm). The application was tested using version v16.20.0.
3. Inside project's directory install packages with:

```bash
npm install
```

### Development server

1. To run development server:

```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

1. To generate an optimized version of your application for production run:

```bash
npm run build
```

2. Start Node.js server with:

```bash
npm run start
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Presentation

1. Install and configure backend [LangImmersion](https://git.wmi.amu.edu.pl/s464887/LangImmersion).
2. First run or everytime you want to clear user data/preferences:

```bash
[ -f db.sqlite3 ] && rm db.sqlite3; [ -f ./media ] && rm -rf ./media; ./manage.py makemigrations && ./manage.py migrate && ./manage.py loaddata languages categories users && ./manage.py crawl --name=openaccessgovernment
```

3. Start Backend server

```bash
./manage.py runserver
```

4. Start Node.js server with:

```bash
npm run start
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
6. If you have previously logged in and want to demonstrate the login again, clear the browser's localStorage or open an incognito window.
