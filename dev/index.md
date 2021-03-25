---
layout: base.njk
---

# Plugin Test Page

This page shows the `mermaid` integration in action!


## Default options

```mermaid
graph TD
A[Public web] -->|HTTP request| B(Firewall)
B --> C{Is port open}
C -->|Yes| D[Proxy to App]
C -->|No| E[Return error]
```

---

```mermaid
graph TD;
A[Want graphs in 11ty] -->|Search Plugin| B(Found plugin);
B --> C{Use plugin?};
C -->|Yes| D[NICE GRAPHS];
C -->|No| E[NO GRAPHS];
```

---

```mermaid
pie title Pieces of cake
    "Apple" : 120
    "Strawberry" : 60
    "Cheese" : 40
```

```mermaid
gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2014-01-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2014-01-12  , 12d
    another task      : 24d
```

## Regular code

The graph above was rendered with mermaidJS using code like

```text
graph TD
A[Public web] -->|HTTP request| B(Firewall)
B --> C{Is port open}
C -->|Yes| D[App]
C -->|No| E[Return error]
```