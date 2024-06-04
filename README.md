1. Description

Tilez is a a game where users move rows of tiles to make words vertically, ‘winning’ when all the tiles have been used and have changed colour. Users can login to retrieve details of their performance on the game from a database.

The project is built using Next.js with the /app router and Tailwind CSS, and uses Clerk for user authentication. The data is stored in a Postgres database, which is created and accessed with SQL queries.

As it's a game there isn't really a problem domain identifiable - unless a user has a problem filling their time with gameplay while expanding their vocabulary.

The game can be played at: https://tilez.vercel.app/

2. Features - users can:

- Log in the the site to access all features
- See a set of tiles to play the game
- Move tiles to find a solution
- Manually stop the game
- See a solved puzzle and a definition of the word
- Reset everything to play the game again
- Add a score to users account
- View the site rendered properly on any size screen
- See an accessible version (Lighthouse.90%)

3. Additional features that could potentially enhance the game:

- Pick an opponent to compare game to
- Show average time to solve of user
- See a more challenging or easier version
- See/hear a timer for the game
- See a daily leaderboard of top scorers
- View game history
- Have variable difficulty levels to explore
- See a message including time to solve if completed

4. Requirements met according to the TechEds brief - the app:

- Uses a database and server
- Has high useability
- Can save a user's score and display historical game data
- Uses Clerk authentificatiion
- Is responsive with 3 break points for mobile, tablet and desktop sceen sizes
- Was a collaborative team project, with all team members contributing
- Is a result of extensive planning: see Trello board for user stories, wireframes, user flow diagram and project management details over the length of the project.
- Uses TypeScipt
- Is mobile responsive
- Scores more than 90% for Lighthouse accessibility
- Uses React useState and useEffect
-

Questions: 3rd party libaries - radix etc?

5. Instructions to run project:

- In terminal: fork the repo at: https://github.com/djsisson/tilez
-
- Open in VSCode by typing 'Code .'
- As Github won't save the '.env.local' files you'll need to do the following:
  create files called '.env.local' and 'env.development.local' in the /tiles/src directory as described in the env.example file supplied (this is fyi only and can be deleted once used)

  setup clerk and note the env variable keys to be pasted into '.env.local'
  setup database of choice note the env variable keys to be pasted into 'env.development.local'
  setup drizzle.config to point to database
  Type 'yarn run driz-mig' to push tables to database
  setup clerk webhook
- In your fork run yarn by typing:
  'corepack enable'
  'yarn'  
   Open http://localhost:3000 with your browser to see the site

  Enjoy!

