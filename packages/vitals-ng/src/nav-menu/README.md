# @smals-belgium-shared/vitals-ng/nav-menu

Secondary entry point of `@smals-belgium-shared/vitals-ng`. It can be used by importing from `@smals-belgium-shared/vitals-ng/nav-menu`.

## Usage

```html
<mh-nav-menu>
  <mh-a href="/home">Home</mh-a>
  <mh-nav-group>
    <h3 slot="header">Group</h3>
    <mh-a href="/one">One</mh-a>
  </mh-nav-group>
</mh-nav-menu>
```

- Groups are collapsible panels. By default the menu behaves like an accordion: opening a group closes the others.
  Add the `multiple` attribute to `mh-nav-menu` to allow several groups to be open at once.
- A group that opens is scrolled into view, so that its expanded content is fully visible.
- A group item that wraps other content containing its own buttons (instead of being a link or button itself) should
  have the `mh-nav-content` class, so the nested buttons keep their regular look instead of being styled as nav-items.
