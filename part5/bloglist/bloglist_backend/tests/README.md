# Bloglist App - Tests

## Important note about tests

This project contains two test files:

- `users_api.test.js` – tests user-related functionality  
- `blog_api.test.js` – tests blog-related functionality  

⚠️ Both test files use the **same test database**.  
Because of this, if you run them **at the same time**, they will interfere with each other (for example, one test may delete data that the other test expects to exist).  
This can cause errors such as duplicate key errors or missing data.

## How to run tests safely

Please run the test files **separately**:

```bash
npm run test tests/users_api.test.js
npm run test tests/blog_api.test.js
```