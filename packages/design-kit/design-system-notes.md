# Design System Notes

## color

- can hardly distinguish medium and light font colors
- secondary and tertiary never used
- type neutral light should be lighter

## divider

- rename dark/light to loud/quiet (so it works in different themes)
- 5 loudnesses

## icon

- all icons are svgs, which means they can be redesigned if needed

## spinner

- track color implemented, but not in figma
- button spinner when loading profile

## button

- only 2 sizes; neither is default
- outlined fill color is not in the fill color swatches
- button has no focus state
- link button has no active state
- link button disabled state does not look disabled
- link button is only danger, but we need at least brand as well
- link button seems to have no clickable area / dimensions / padding
- basically link button needs a full make-over from design perspective
- when fixing later in MAGS, search for `mh-a::part(base)` overrides
- loading state has spinner on both sides; pick one

## icon button

- what is the point of icon button with label ? just use a button
- variants are different from normal buttons
- only one size

## card

- only with shadow, but we use a version with border in many places
- need clickable card
- design with checkbox/radio on top of the label is weird and problematic for a11y (suggest to move it to the title row)

## radio

- small white border in hover state intentional ?
- disabled selected state is confusing
- what on earth is that boxed checkbox ??
- where does error message go
- error state of radio group missing
- no "hint" (use describedby when it does)
- no focus state

## checkbox

- square in circle hover state?
- hover state has weird interactions with surrounding elements because no transparency
- no hint
- no focus state

## input

- validation message pushes down the input, which can happen while you're interacting with it !!
- unclear how they interact with surrounding elements (does the height remain the same when it has a hint or when it doesn't? etc etc)
- no readonly state (often very important in CRUD apps)
- what is the difference between default and filled ?
- what is pressed ? is it focused ?
- sizes are different from button
- no placeholder
- no design without icons (text padding in that case ?)
- disabled state hardly distinguishable
- only one invalid state; no hover, no focus

## callout (alert)

- renamed alert to callout to be in line with other web component libraries
- red notification icon in neutral callout looks weird; should be gray

## chips

- The chips component had 3 variants in the design system: `input`, `filter`, `status`. These names were unclear, you could not tell what these chips do without looking at them. Thus they have been renamed to `removable`, `selectable` and `display` for clarity.

## i18n formatting

- define global rules on how to deal with dates and numbers in myhealth apps/components

## skeleton

- no animation provided: we made 2 plus the option to turn it off
- we just made equal height bars (instead of the huge 3d one)

## typography

- the breakdown in figma in 3 screen types is unintelligible and very rigid
- the size ratios are off: very small size difference between some headings and very large between others
- so I implemented fluid typography, loosely based on the values I found there
- and created classes to be able to keep semantic sequence (h1 > h2 > h3 > etc) but change the size if the design calls for it
