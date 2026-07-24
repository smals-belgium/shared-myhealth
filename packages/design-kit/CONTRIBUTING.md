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

### Adding icons

- Add an svg file to the `./src/icon/svg/` dir
- The file name is used as the `mh-icon` name property, so double check it
- Make sure all svg `path`s have `fill="currentColor"`, otherwise CSS color will not affect the icon
- Preferred box size is 24x24

Currently we use Material icons for backwards compatibility.  
SVGs can be downloaded from https://fonts.google.com/icons

### Writing components

All components are located directly under the design kit's `src` directory in a flat structure.  
Each component has a dedicated directory.

```
design-kit/
|- src/
    |- component-a/
    |- component-b/
```

There may be an exception to this rule if there are more variations of the same component.  
i.e. two components that have to be registered separately, but share a vast majority of functionality.

Otherwise a simple component will follow this base file structure:

```
my-component
|- index.ts
|- my-component.css
|- my-component.spec.ts
|- my-component.ts
```

The index file is what will be publicly accessible to users of the DK.  
Typically you'll just export the component and register the component's tag name in the DOM type system.

```ts
import type { MyComponent } from './my-component';

export * from './my-component';

declare global {
  interface HTMLElementTagNameMap {
    'mh-my-component': MyComponent;
  }
}
```

The split between component, styles and unit tests is self-explanatory.  
However, the CSS file can be further broken down:

- if a component has visual variations (appearances, loudnesses, sizes, etc.) these should go into dedicated files
  whose extension is `.<variation>.css`
- if a component overrides the styles of projected other components, these should go into dedicated files whose
  extension is `-<slot-name>.slot.css`
- if a component has a lot of css variables, they can go into a dedicated file with extension `.vars.css`

So the most extensive example would look something like:

```
my-component
|- my-component.css
|- my-component-icon.slot.css
|- my-component-checkbox.slot.css
|- my-component.appearance.css
|- my-component.size.css
|- my-component.vars.css
```

### Events

When developing components it's important to know that events from child components sometimes bubble through the
shadow DOM boundary, but sometimes they stop there. This is determined by the
[composed](https://developer.mozilla.org/en-US/docs/Web/API/Event/composed) property. There is no general rule
to determine if an event is composed or not, so I'll include a table of form- and focus-related events:

#### Form events

| event       | bubbles | composed |
| ----------- | ------- | -------- |
| input       | ✅      | ✅       |
| beforeinput | ✅      | ✅       |
| change      | ✅      | ❌       |
| invalid     | ❌      | ❌       |
| submit      | ✅      | ❌       |
| reset       | ✅      | ❌       |
| formdata    | ✅      | ❌       |

#### Focus events

| event    | bubbles | composed |
| -------- | ------- | -------- |
| focus    | ❌      | ❌       |
| blur     | ❌      | ❌       |
| focusin  | ✅      | ✅       |
| focusout | ✅      | ✅       |

There are tons of other native events, and while most compose, it's not a guarantee, so check the docs.

#### Retargeting

So what should you do with this knowledge ?  
Well, non-composed events have to be re-dispatched from the host component if you want to expose them to the outside
world. For example most form components will have to do something along these lines:

```ts
  #onChange() {
    if (this.el) this.internals.setFormValue(this.el.value);
    this.dispatchEvent(new Event('change', { bubbles: true }));
  }
```

Note that this changes the `target` property of the event to your custom component; it's no longer pointing to the
original element. More importantly, **even when you do not interfere with a composed event, it's `target` will also
change to the host component**. In other words: the re-targeting behaviour is the same in both cases.

Why is this important ? Because you might be expecting the event to carry information like the form item's `value`
property. That's why you have to mirror such properties on the host component and keep them in sync.

#### Custom events

The design philosophy of this library in general is to stay as close as possible to existing native API's.
This includes events. The general rule is to use native events where possible, and create custom events only if
no native event can cover the case. Custom events must be prefixed with `mh-` just like component selectors.

Some use cases:

- **wrapping an existing native element** to be able to style it with shadow DOM encapsulation. In this case you
  make sure all native events go through. As discussed earlier: if they're composed, there's nothing to do, if they're
  not you must redispatch **the same event**.
- **composing native elements** to create something new or slightly different. If the composed element fires native
  events that you want to expose in your own API, use that.
- **creating new elements** altogether. Try to find existing native events from other HTML elements that cover the
  same use case (or similar enough that it makes sense). For example, if the component can be closed in some way,
  reuse HTMLDialogElement's "close" event.

Consider creating a custom event only when none of these paths lead to a solution.

### Error handling

### Internationalisation (i18n)

### Accesibility (a11y)

### Testing
