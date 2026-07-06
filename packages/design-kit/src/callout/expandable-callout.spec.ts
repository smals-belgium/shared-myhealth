import { fixture, oneEvent } from '@open-wc/testing';
import { html } from 'lit';

import { assertAccessibility, part, slot } from '../core/testing';

import type { CalloutClosedEvent } from './callout-closed.event.js';
import type { CalloutToggledEvent } from './callout-toggled.event.js';
import './expandable-callout';
import type { ExpandableCallout } from './expandable-callout.js';

describe('expandable-callout', () => {
  describe('accessibility', () => {
    it('passes accessibility tests', async () => {
      const el = await fixture<ExpandableCallout>(html`
        <mh-expandable-callout open>
          <span slot="title">Title</span>
          <span slot="description">Description</span>
        </mh-expandable-callout>
      `);

      await assertAccessibility(el);
    });
  });

  describe('slots', () => {
    it('renders the title, description and actions slots', async () => {
      const el = await fixture<ExpandableCallout>(html`
        <mh-expandable-callout open>
          <span slot="title">Title</span>
          <span slot="description">Description</span>
          <span slot="actions">Actions</span>
        </mh-expandable-callout>
      `);

      expect(slot('title', el)?.assignedNodes().length).toBe(1);
      expect(slot('description', el)?.assignedNodes().length).toBe(1);
      expect(slot('actions', el)?.assignedNodes().length).toBe(1);
    });
  });

  describe('variant', () => {
    it('shows the icon mapped to the variant', async () => {
      const el = await fixture<ExpandableCallout>(
        html`<mh-expandable-callout variant="danger"></mh-expandable-callout>`,
      );

      expect(part('icon', el)?.getAttribute('name')).toBe('emergency_home');
    });
  });

  describe('open / expand', () => {
    it('is collapsed by default', async () => {
      const el = await fixture<ExpandableCallout>(html`
        <mh-expandable-callout>
          <span slot="title">Title</span>
        </mh-expandable-callout>
      `);

      expect(el.open).toBe(false);
      expect(el.hasAttribute('open')).toBe(false);
    });

    it('starts expanded when the open attribute is set', async () => {
      const el = await fixture<ExpandableCallout>(html`
        <mh-expandable-callout open>
          <span slot="title">Title</span>
        </mh-expandable-callout>
      `);

      expect(el.open).toBe(true);

      const details =
        el.shadowRoot?.querySelector<HTMLDetailsElement>('details');
      expect(details?.open).toBe(true);
    });

    it('renders a chevron toggle and no close button', async () => {
      const el = await fixture<ExpandableCallout>(html`
        <mh-expandable-callout>
          <span slot="title">Title</span>
        </mh-expandable-callout>
      `);

      expect(part('toggle', el)).not.toBeNull();
      expect(part('close', el)).toBeNull();
    });

    it('toggles open and emits mh-callout-toggled when the summary is activated', async () => {
      const el = await fixture<ExpandableCallout>(html`
        <mh-expandable-callout>
          <span slot="title">Title</span>
        </mh-expandable-callout>
      `);

      setTimeout(() =>
        part('header', el)?.dispatchEvent(new MouseEvent('click')),
      );
      const event = (await oneEvent(
        el,
        'mh-callout-toggled',
      )) as CalloutToggledEvent;

      expect(event.open).toBe(true);
      expect(el.open).toBe(true);
    });

    it('toggles open and closed via the toggle() method', async () => {
      const el = await fixture<ExpandableCallout>(html`
        <mh-expandable-callout>
          <span slot="title">Title</span>
        </mh-expandable-callout>
      `);

      el.toggle();
      expect(el.open).toBe(true);

      el.toggle();
      expect(el.open).toBe(false);
    });

    it('sets an explicit state when toggle() receives a force argument', async () => {
      const el = await fixture<ExpandableCallout>(html`
        <mh-expandable-callout open>
          <span slot="title">Title</span>
        </mh-expandable-callout>
      `);

      el.toggle(true);
      expect(el.open).toBe(true);

      el.toggle(false);
      expect(el.open).toBe(false);
    });

    it('emits mh-callout-toggled via toggle()', async () => {
      const el = await fixture<ExpandableCallout>(html`
        <mh-expandable-callout>
          <span slot="title">Title</span>
        </mh-expandable-callout>
      `);

      setTimeout(() => el.toggle());
      const event = (await oneEvent(
        el,
        'mh-callout-toggled',
      )) as CalloutToggledEvent;

      expect(event.open).toBe(true);
    });
  });

  describe('callout-close', () => {
    it('removes itself and emits mh-callout-closed when a callout-close button is activated', async () => {
      const el = await fixture<ExpandableCallout>(html`
        <mh-expandable-callout open>
          <span slot="title">Title</span>
          <button
            slot="actions"
            callout-close
          >
            Dismiss
          </button>
        </mh-expandable-callout>
      `);

      const button = el.querySelector('button');
      setTimeout(() => button?.click());
      const event = (await oneEvent(
        el,
        'mh-callout-closed',
      )) as CalloutClosedEvent;

      expect(event).toBeInstanceOf(Event);
      expect(el.isConnected).toBe(false);
    });
  });

  describe('accessibility: ARIA roles and live regions', () => {
    it('sets role="alert" and aria-live="assertive" for danger variant', async () => {
      const el = await fixture<ExpandableCallout>(
        html`<mh-expandable-callout
          variant="danger"
          open
        ></mh-expandable-callout>`,
      );

      const region = part('region', el);
      expect(region?.getAttribute('role')).toBe('alert');
      expect(region?.getAttribute('aria-live')).toBe('assertive');
    });

    it('sets role="status" and aria-live="polite" for info variant', async () => {
      const el = await fixture<ExpandableCallout>(
        html`<mh-expandable-callout
          variant="info"
          open
        ></mh-expandable-callout>`,
      );

      const region = part('region', el);
      expect(region?.getAttribute('role')).toBe('status');
      expect(region?.getAttribute('aria-live')).toBe('polite');
    });
  });
});
