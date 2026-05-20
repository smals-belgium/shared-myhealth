# MyHealth monorepo

✨ All public libraries for MyHealth frontend applications ✨.  
The monorepo is managed as an [Nx Workspace](https://nx.dev/).

## Design Kit

### Design System

Based on the MyHealth Global Design System, this a UI component library based on [Lit](https://lit.dev/).
DS Figma: https://www.figma.com/design/OvonpzXEpimUD9FZfDVvgF/MaSant%C3%A9---Global-Design-System

### Tool chain

- Vite for bundling
- Vitest for unit testing

### Core technologies

- [Web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
- [Lit](https://lit.dev/)
- [Open web components testing package](https://open-wc.org/docs/testing/testing-package/)

### Get started

```sh
git clone git@github.com:smals-belgium/myhealth.git
npm install
npm start
```

Will start a Vite dev server with a sandbox application to test the MyHealth components.

`nx run @myhealth/design-kit:serve`: Serve the component sandbox app
`nx run @myhealth/design-kit:test`: Run unit tests
`nx run @myhealth/design-kit:build`: Build and bundle

## Contributing

There's no automated pipeline yet, so be sure to run all these before pushing a PR:

```sh
npm build
npm test
npm format
npm lint
```
