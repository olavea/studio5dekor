# studio5dekor / store

This repo creates a single page store with the stripe skus from the first stripe product it finds.

- The header uses the product name.
- The options for each sku uses the product attribute\_\* metadata.
- The footer uses the product footer metadata.

The checkout flow uses the default stripe checkout, and a custom lamda function. This function does a lot in one go, so the buy button might spin for a little while after the checkout form has closed.

### Development

- Run `STRIPE_SECRET_KEY=<stripe secret key> GATSBY_STRIPE_PUBLISHABLE_KEY=<stripe publishable key> npm run develop`.

### Deploy to Netlify

- Create site on Netlify.
- In your site dashboard under Settings > Build & deploy > Continuous Deployment > Build environment variables add your STRIPE_SECRET_KEY and GATSBY_STRIPE_PUBLISHABLE_KEY.
- Set up continuous deployment from this Github repository.
