# Introduction

**Sawala** is an Wrapper of [Qiscus Chat SDK](https://github.com/qiscus/qiscus-sdk-web-core) using the React framework. It's designed for Kata Internal needs.

**Note: Sawala is still in beta.**

## Leading Design Goals (North Star)

These goals guide us on what to strive for when building features for Sawala.

### Clear and transparent.

- Use component/prop names that are as clear and standard as possible.
- Strive for component + prop names no longer than 2-3 words.
- Use the onVerb naming structure for event handlers.
- Keep component/prop names concise without being clever.
- When in doubt, look at other component libraries for inspiration.

### Extensible, yet simple.

- Provide primitive components (e.g. `Box` and `Text`) which provides full control of styling + theme.
- Higher-level components should’t expose underlying internals in the API unless necessary.
- Consider leveraging React features + patterns like [render props](https://reactjs.org/docs/render-props.html) and/or [Hooks](https://reactjs.org/docs/hooks-intro.html) for enhanced modularity + easy reuse of components.

### Accessibility comes first.

- Components should be designed with accessibility in mind. Make sure the fancy features doesn’t break accessibility. (Morten Rand-Hendriksen)
- Strive for an accessible color contrast ratio. Aim for a contrast rating higher than “AA” and “AA Large”. (Check your color contrast [here](https://colorable.jxnblk.com/))
- Make sure components work well with screen readers, as well as for users with limited access to keyboards and mice.
