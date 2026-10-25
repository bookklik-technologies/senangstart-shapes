import { uiIcon } from './ui-icons.mjs';

// A select-only combobox: focus stays on the trigger while the list is open.
export function createDropdown(root, { id, label, options = [], value, onChange }) {
  const document = root.ownerDocument;
  root.classList.add('ss-dropdown');
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'ss-dropdown-trigger';
  trigger.setAttribute('role', 'combobox');
  trigger.setAttribute('aria-label', label);
  trigger.setAttribute('aria-haspopup', 'listbox');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-controls', id);
  trigger.innerHTML = `<span class="ss-dropdown-value"></span>${uiIcon('chevron-down')}`;

  const list = document.createElement('div');
  list.id = id;
  list.className = 'ss-dropdown-menu';
  list.setAttribute('role', 'listbox');
  list.setAttribute('aria-label', label);
  list.hidden = true;
  root.replaceChildren(trigger, list);

  let items = [];
  let selected = -1;
  let active = -1;
  let expanded = false;
  let typed = '';
  let typedAt = 0;

  function highlight(index) {
    active = index;
    for (const [position, option] of Array.from(list.children).entries()) {
      option.classList.toggle('is-active', expanded && position === active);
    }
    if (expanded && active >= 0) {
      const option = list.children[active];
      trigger.setAttribute('aria-activedescendant', option.id);
      const top = option.offsetTop;
      const bottom = top + option.offsetHeight;
      if (top < list.scrollTop) list.scrollTop = top;
      else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
    } else {
      trigger.removeAttribute('aria-activedescendant');
    }
  }

  function close(focus = false) {
    expanded = false;
    list.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    highlight(selected);
    typed = '';
    if (focus && trigger.isConnected) trigger.focus();
  }

  function open() {
    if (!items.length) return;
    expanded = true;
    list.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    // Keep menus inside the viewport and any enclosing modal's scroll area.
    const box = trigger.getBoundingClientRect();
    const modal = root.closest('dialog')?.getBoundingClientRect();
    const below = Math.min(document.documentElement.clientHeight - 8, modal ? modal.bottom - 8 : Infinity) - box.bottom;
    const above = box.top - Math.max(8, modal ? modal.top + 8 : 0);
    const height = Math.min(320, list.scrollHeight);
    const side = below < height + 6 && above > below ? 'top' : 'bottom';
    root.dataset.side = side;
    list.style.maxHeight = Math.max(0, Math.min(320, (side === 'top' ? above : below) - 6)) + 'px';
    highlight(selected);
  }

  function select(index, focus = true) {
    if (index < 0 || index >= items.length) return;
    const changed = selected !== index;
    selected = index;
    trigger.querySelector('.ss-dropdown-value').textContent = items[selected].label;
    for (const [position, option] of Array.from(list.children).entries()) {
      option.setAttribute('aria-selected', String(position === selected));
    }
    close(focus);
    if (changed) onChange?.(items[selected].value);
  }

  function setValue(nextValue) {
    selected = items.findIndex(item => item.value === nextValue);
    if (selected < 0 && items.length) selected = 0;
    trigger.disabled = !items.length;
    trigger.querySelector('.ss-dropdown-value').textContent = items[selected]?.label || label;
    for (const [position, option] of Array.from(list.children).entries()) {
      option.setAttribute('aria-selected', String(position === selected));
    }
    close();
  }

  function setOptions(nextOptions, nextValue) {
    items = nextOptions;
    list.replaceChildren(...items.map((item, index) => {
      const option = document.createElement('div');
      option.id = `${id}-option-${index}`;
      option.className = 'ss-dropdown-option';
      option.setAttribute('role', 'option');
      option.dataset.index = String(index);
      const text = document.createElement('span');
      text.textContent = item.label;
      option.append(text);
      option.insertAdjacentHTML('beforeend', uiIcon('check'));
      return option;
    }));
    setValue(nextValue);
  }

  function onTriggerClick() {
    if (expanded) close();
    else open();
  }

  function onKeyDown(event) {
    const key = event.key;
    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(key)) {
      event.preventDefault();
      const wasExpanded = expanded;
      if (!expanded) open();
      if (key === 'Home') highlight(0);
      else if (key === 'End') highlight(items.length - 1);
      else if (wasExpanded) highlight((active + (key === 'ArrowDown' ? 1 : -1) + items.length) % items.length);
    } else if (key === 'Enter' || key === ' ') {
      event.preventDefault();
      if (expanded) select(active);
      else open();
    } else if (key === 'Escape' && expanded) {
      event.preventDefault();
      event.stopPropagation();
      close(true);
    } else if (key === 'Tab' && expanded) {
      select(active, false);
    } else if (key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      const now = Date.now();
      typed = (now - typedAt < 700 ? typed : '') + key.toLocaleLowerCase();
      typedAt = now;
      const query = Array.from(typed).every(character => character === typed[0]) ? typed[0] : typed;
      if (!expanded) open();
      const index = items.map((_, offset) => (active + offset + 1) % items.length)
        .find(position => items[position].label.toLocaleLowerCase().startsWith(query));
      if (index !== undefined) highlight(index);
    }
  }

  function onListClick(event) {
    const option = event.target.closest('[role="option"]');
    if (option && list.contains(option)) select(Number(option.dataset.index));
  }

  function onListHover(event) {
    const option = event.target.closest('[role="option"]');
    if (option && list.contains(option)) highlight(Number(option.dataset.index));
  }

  function onOutside(event) {
    if (expanded && !root.contains(event.target)) close();
  }

  trigger.addEventListener('click', onTriggerClick);
  trigger.addEventListener('keydown', onKeyDown);
  list.addEventListener('click', onListClick);
  list.addEventListener('pointermove', onListHover);
  document.addEventListener('pointerdown', onOutside);
  document.addEventListener('focusin', onOutside);
  setOptions(options, value);

  return {
    setOptions,
    setValue,
    close,
    destroy() {
      close();
      trigger.removeEventListener('click', onTriggerClick);
      trigger.removeEventListener('keydown', onKeyDown);
      list.removeEventListener('click', onListClick);
      list.removeEventListener('pointermove', onListHover);
      document.removeEventListener('pointerdown', onOutside);
      document.removeEventListener('focusin', onOutside);
    },
  };
}
